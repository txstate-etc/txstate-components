import React, { useRef, useImperativeHandle, useCallback, useEffect, useReducer } from 'react'
import { useEvent } from '../hooks/useEvent'
import { Subject } from '../utils/Subject'
import set from 'lodash/set'
import unset from 'lodash/unset'
import clone from 'lodash/clone'
import minBy from 'lodash/minBy'
import filter from 'lodash/filter'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import shortid from 'shortid'

export const FormContext = React.createContext({})

type ActionType = 'set' | 'remove' | 'validation'
type Action<T = any> = { payload: T, path?: string, type: ActionType }

const immutableReducer = <T extends Object>(state: T, action: Action) => {
  let localState = null
  let localValue = null
  switch (action.type) {
    case 'set':
      if (!action.path) throw new Error(`Tried to set value ${JSON.stringify(action.payload)} without a path`)
      localState = clone(state)
      localValue = clone(action.payload)
      return set(localState, action.path, localValue)
    case 'remove':
      if (!action.path) throw new Error('Tried to remove value without a path')
      localState = clone(state)
      unset(localState, action.path)
      return localState
    case 'validation':
      return action.payload
    default:
      return state
  }
}

export type Optional<T> = T | undefined
export type Maybe<T> = T | null

type FormArgs<T> = {
  [key in keyof T]: T[keyof T]
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}
interface FormProps<T> {
  setup: T
  initialValues?: RecursivePartial<T>
  onSubmit?: ({ form, errors }: { form: T, errors: RecursivePartial<T> }) => Promise<void>
  onChange?: Function
  validate?: Function
  validationDelay?: number
  forwardRef?: React.Ref<FormRef>
  id?: string
  runValidateOnSubmit?: boolean
  children?: React.ReactNode
}

export interface FormRef {
  submit: () => Promise<void>
  updatePath: (path: string, value: any) => void
}

export type ErrorReport = {
  inputEvent: string
  error: boolean
  _index: number
}

type Form = <T>(props: FormProps<T>) => JSX.Element

export const Form: Form = (props) => {
  const {
    children,
    onSubmit,
    onChange,
    validate,
    forwardRef,
    validationDelay = 300,
    initialValues,
    id,
    runValidateOnSubmit
  } = props
  const formEvent = useRef(id || shortid.generate())
  const _initialState = useRef(initialValues || {})
  const firstValidationSkipped = useRef(false)
  const childCount = useRef(0)
  const _childErrReport = useRef<ErrorReport[]>([])

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

  const handleErrorReport = useCallback((report: ErrorReport) => {
    _childErrReport.current.push(report)
    if (_childErrReport.current.length === childCount.current) {
      const childrenWithErrors = filter(_childErrReport.current, { error: true })
      const firstError = minBy(childrenWithErrors, '_index')
      if (firstError) {
        Subject.next(`${firstError.inputEvent}-go-focus-yourself`)
      }
      _childErrReport.current = []
    }
  }, [_childErrReport, childCount])

  useEvent(`${formEvent.current}-register-self`, handleChildRegister)
  useEvent(`${formEvent.current}-data`, handleChildData)
  useEvent(`${formEvent.current}-error-report`, handleErrorReport)

  useEffect(() => {
    notifyChildrenReady(_initialState.current)
  }, [notifyChildrenReady])

  const validateOnChange = useCallback(async (form, submit = false) => {
    try {
      if (typeof validate !== 'function') {
        return { errors: {}, success: {} }
      }
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
      return { errors: {}, success: {} }
    }
  }, [broadcastValidateResults, validate])

  const submitForm = useCallback(async () => {
    if (runValidateOnSubmit) {
      broadcastSetAllDirty()
      const { errors } = await validateOnChange(form, true)
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
  }, [updateChildState])

  useImperativeHandle(forwardRef, () => ({
    submit: submitForm,
    updatePath
  }))

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
}
