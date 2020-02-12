import React, { useRef, useImperativeHandle, useCallback, useEffect, useReducer } from 'react'
import { useEvent } from '../hooks/useEvent'
import { Subject } from '../utils/Subject'
import set from 'lodash/set'
import unset from 'lodash/unset'
import clone from 'lodash/clone'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import shortid from 'shortid'

export const FormContext = React.createContext({})

type Action<T = any> = { payload: T, path: string, type: string }

const immutableReducer = <T extends Object>(state: T, action: Action) => {
  let localState = null
  let localValue = null
  switch (action.type) {
    case 'set':
      localState = clone(state)
      localValue = clone(action.payload)
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

type Errors = {
  [key: string]: string
}

interface FormProps<T> {
  onSubmit?: ({ form, errors }: { form: T, errors: T }) => Errors | void
  onChange?: Function
  validate?: Function
  validationDelay?: number
  initialValues: T
  id?: string
  runValidateOnSubmit?: boolean
  children?: React.ReactNode
}

export const Form = <T extends Object, K>(props: FormProps<T>, ref: React.Ref<K>) => {
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
  const formEvent = useRef(id || shortid.generate())
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
      const childrenWithErrors = _childErrReport.current.filter(child => child.error)
      if (childrenWithErrors.length > 0) {
        let min = childrenWithErrors[0]

        for (let i = 1, len = childrenWithErrors.length; i < len; i++) {
          const v = childrenWithErrors[i]._index
          min = (v < min) ? v : min
        }
        Subject.next(`${min.inputEvent}-go-focus-yourself`)
        while (_childErrReport.current.length) { _childErrReport.current.pop() }
      } else { while (_childErrReport.current.length) { _childErrReport.current.pop() } }
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
  }, [runValidateOnSubmit, onSubmit, broadcastSetAllDirty, validateOnChange, form, errors, broadcastValidateResults, broadcastIndexCheck])

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
