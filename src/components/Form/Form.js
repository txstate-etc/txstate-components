import React, { useRef, useImperativeHandle, useCallback, useEffect, useReducer } from 'react'
import { useEvent } from '../../hooks'
import { Subject } from '../../utils'
import set from 'lodash/set'
import unset from 'lodash/unset'
import clone from 'lodash/clone'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'
import filter from 'lodash/filter'
import minBy from 'lodash/minBy'

export const FormContext = React.createContext({})

const immutableReducer = (state, action) => {
  let localState = null
  switch (action.type) {
    case 'set':
      localState = clone(state)
      const localValue = clone(action.payload)
      return set(localState, action.path, localValue)
    case 'remove':
      localState = clone(state)
      unset(localState, action.path)
      return localState
    case 'validation':
      return action.payload
    default:
      return state
  }
}

// TODO: Add index ordering to the form inputs that register with the form.
export const Form = React.forwardRef((props, ref) => {
  const {
    children,
    onSubmit,
    onChange,
    validate,
    validationDelay = 300,
    initialValues,
    id,
    runValidateOnSubmit
  } = props
  const formEvent = useRef(id || uuid())
  const _initialState = useRef(initialValues || {})
  const firstValidationSkipped = useRef(false)
  const childCount = useRef(0)
  const _childErrReport = useRef([])

  const [form, formDispatch] = useReducer(immutableReducer, _initialState.current)
  const [errors, errorDispatch] = useReducer(immutableReducer, {})
  const [success, successDispatch] = useReducer(immutableReducer, {})

  const handleChildData = useCallback(({ path, value, inputEvent, transformer }) => {
    if (!path) return
    let transformedValue = value
    if (transformer && typeof transformer === 'function') {
      transformedValue = transformer(value)
    }
    formDispatch({ type: 'set', path, payload: transformedValue })
    Subject.next(inputEvent, value)
  }, [formDispatch])

  const broadcastValidateResults = useEvent(`${formEvent.current}-validate-result`)
  const notifyChildrenReady = useEvent(`${formEvent.current}-form-ready`)
  const updateChildState = useEvent(`${formEvent.current}-update-state`)
  const broadcastIndexCheck = useEvent(`${formEvent.current}-index-check`)
  const broadcastSetAllDirty = useEvent(`${formEvent.current}-set-all-dirty`)

  const handleChildRegister = useCallback((inputEvent) => {
    childCount.current += 1
    Subject.next(`${inputEvent}-update-index`, childCount.current)
  }, [])

  const handleErrorReport = useCallback((report) => {
    _childErrReport.current.push(report)
    if (_childErrReport.current.length === childCount.current) {
      const childrenWithErrors = filter(_childErrReport.current, { error: true })
      const minError = minBy(childrenWithErrors, '_index') || {}
      minError && Subject.next(`${minError.inputEvent}-go-focus-yourself`)
      _childErrReport.current = []
    }
  }, [_childErrReport, childCount])

  useEvent(`${formEvent.current}-register-self`, handleChildRegister)
  useEvent(`${formEvent.current}-data`, handleChildData)
  useEvent(`${formEvent.current}-error-report`, handleErrorReport)

  useEffect(() => {
    notifyChildrenReady(_initialState.current)
  }, [notifyChildrenReady])

  const submitForm = useCallback(async () => {
    if (runValidateOnSubmit) {
      broadcastSetAllDirty()
      const { errors, success } = await validateOnChange(form, true)
      if ((Object.entries(errors).length > 0)) return
    }
    if (onSubmit && typeof onSubmit === 'function') {
      try {
        const results = await onSubmit({ form, errors })
        const errorResults = get(results, 'errors')
        const successResults = get(results, 'success')
        if (errorResults || successResults) {
          broadcastValidateResults({ errors: errorResults, success: successResults, submit: 'true' })
        }
      } catch (results) {
        const errorResults = get(results, 'errors')
        const successResults = get(results, 'success')
        broadcastValidateResults({ errors: errorResults, success: successResults, submit: 'true' })
      } finally {
        broadcastIndexCheck(childCount.current)
      }
    }
  }, [onSubmit, broadcastValidateResults, form, errors])

  const updatePath = useCallback((path, value) => {
    const updatedState = set({}, path, value)
    updateChildState(updatedState)
  })

  useImperativeHandle(ref, () => ({ submit: submitForm, updatePath }))

  const validateOnChange = useCallback(async (form, submit = false) => {
    try {
      if (typeof validate !== 'function') return
      const results = await validate(form)
      const errors = get(results, 'errors')
      const success = get(results, 'success')
      errorDispatch({ type: 'validation', payload: errors })
      successDispatch({ type: 'validation', payload: success })
      if (errors || success) {
        broadcastValidateResults({ errors, success, submit: !!submit })
      }
      return { errors, success }
    } catch (err) {
      console.log(err)
    }
  }, [broadcastValidateResults, validate])

  const debouncedValidate = useCallback(debounce(validateOnChange, validationDelay), [broadcastValidateResults, validate])

  useEffect(() => {
    if (onChange && typeof onChange === 'function') {
      onChange({ form, errors, success })
    }
  }, [form, onChange, errors, success])

  useEffect(() => {
    debouncedValidate.cancel()
    if (!firstValidationSkipped.current) {
      firstValidationSkipped.current = true
      return
    }
    debouncedValidate(form)
  }, [debouncedValidate, form])

  return (
    <FormContext.Provider value={formEvent.current}>
      <form onSubmit={e => {
        e.preventDefault()
        submitForm && submitForm()
      }}>
        {children}
      </form>
    </FormContext.Provider>
  )
})

Form.propTypes = {
  /** This function is run when the form's submit function is called */
  onSubmit: PropTypes.func,
  /** Runs on every change of the form */
  onChange: PropTypes.func,
  /** Runs on every change, return value is used to display errors in components */
  validate: PropTypes.func,
  /** Sets the initial form state */
  initialValues: PropTypes.object,
  /** An optional ID which will be used instead of a randomly generated id */
  id: PropTypes.string,
  /** The amount of time to wait, in milliseconds, before calling the validation function */
  validationDelay: PropTypes.number,
  /** Would you like the validation function to run and pass with no errors before running submit function? */
  runValidateOnSubmit: PropTypes.bool
}
