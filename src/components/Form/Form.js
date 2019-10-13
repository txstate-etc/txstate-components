import React, { useRef, useImperativeHandle, useCallback, useEffect, useReducer } from 'react'
import { useEvent } from '../../hooks'
import { Subject } from '../../utils'
import { set, unset, clone, get, debounce } from 'lodash'
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'

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

export const Form = React.forwardRef((props, ref) => {
  const {
    children,
    onSubmit,
    onChange,
    validate,
    initialValues,
    id
  } = props
  const formEvent = useRef(id || uuid())
  const _initialState = useRef(initialValues || {})
  const firstValidationSkipped = useRef(false)

  const [form, formDispatch] = useReducer(immutableReducer, _initialState.current)
  const [errors, errorDispatch] = useReducer(immutableReducer, {})

  const handleChildData = useCallback(({ path, value, inputEvent, transformer }) => {
    if (!path) return
    let transformedValue = value
    if (transformer && typeof transformer === 'function') {
      transformedValue = transformer(value)
    }
    formDispatch({ type: 'set', path, payload: transformedValue })
    Subject.next(inputEvent, value)
  }, [formDispatch])

  const broadcastValidateResults = useCallback(useEvent(`${formEvent.current}-validate-result`), [])

  useCallback(() => {
  }, [])

  useEvent(`${formEvent.current}-data`, handleChildData)

  const notifyChildrenReady = useCallback(useEvent(`${formEvent.current}-form-ready`), [])

  useEffect(() => {
    notifyChildrenReady(_initialState.current)
  }, [notifyChildrenReady])

  const submitForm = (async () => {
    if (onSubmit && typeof onSubmit === 'function') {
      try {
        const results = await onSubmit({ form, errors })
        const errorResults = get(results, 'errors')
        if (errorResults) {
          broadcastValidateResults(errorResults)
        }
      } catch (results) {
        const errors = get(results, 'errors')
        broadcastValidateResults(errors)
      }
    }
  }, [onSubmit, form, errors, broadcastValidateResults])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    await submitForm()
  }, [submitForm])

  useImperativeHandle(ref, () => ({ submit: submitForm }))

  const validateOnChange = useCallback(debounce(async (form) => {
    try {
      if (typeof validate !== 'function') return
      const results = await validate(form)
      const errors = get(results, 'errors')
      errorDispatch({ type: 'validation', payload: errors })
      if (errors) {
        broadcastValidateResults(errors)
      }
    } catch (err) {
      console.log(err)
    }
  }, 300), [validate, broadcastValidateResults])

  useEffect(() => {
    if (onChange && typeof onChange === 'function') {
      onChange({ form, errors })
    }
  }, [form, onChange, errors])

  useEffect(() => {
    validateOnChange.cancel()
    if (!firstValidationSkipped.current) {
      firstValidationSkipped.current = true
      return
    }
    validateOnChange(form)
  }, [validateOnChange, form])

  return (
    <FormContext.Provider value={formEvent.current}>
      <form onSubmit={handleSubmit}>
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
  id: PropTypes.string
}
