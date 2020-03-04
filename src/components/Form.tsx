import React, { useRef, useImperativeHandle, useCallback, useEffect, useReducer } from 'react'
import { useEvent } from '../hooks/useEvent'
import { Subject } from '../utils/Subject'
import set from 'lodash/set'
import unset from 'lodash/unset'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import nanoid from 'nanoid'
import produce from 'immer'
import { minBy, filter } from '../utils/helpers'
import { ErrorReport, Action, RecursivePartial, OnSubmit, OnChange, OnValidate, FormRef } from './Form.types'

export const FormContext = React.createContext({})

const formStateReducer = produce((draft, action: Action) => {
  switch (action.type) {
    case 'set':
      if (!action.path) throw new Error(`Tried to set value ${JSON.stringify(action.payload)} without a path`)
      set(draft, action.path, action.payload)
      break
    case 'remove':
      if (!action.path) throw new Error('Tried to remove value without a path')
      unset(draft, action.path)
      break
  }
})

const validationReducer = produce((draft, action: Action) => {
  switch (action.type) {
    case 'errors':
      draft.errors = action.payload
      break
    case 'success':
      draft.success = action.payload
  }
})

interface FormProps<T> {
  setup?: T
  initialValues?: RecursivePartial<T>
  onSubmit?: OnSubmit<T>
  onChange?: OnChange<T>
  onValidate?: OnValidate<T>
  validationDelay?: number
  forwardRef?: React.Ref<FormRef>
  id?: string
  runValidateOnSubmit?: boolean
  children?: React.ReactNode
}

type Form = <T = any>(props: FormProps<T>) => JSX.Element

export const Form: <T = any>(props: FormProps<T>) => JSX.Element = (props) => {
  const {
    children,
    onSubmit,
    onChange,
    onValidate,
    forwardRef,
    validationDelay = 300,
    initialValues,
    id,
    runValidateOnSubmit
  } = props

  const formId = useRef(id || nanoid(10))
  const firstValidationSkipped = useRef(false)
  const childCount = useRef(0)
  const childErrorReports = useRef<ErrorReport[]>([])

  const [form, formDispatch] = useReducer(formStateReducer, initialValues ?? {})
  const [{ errors, success }, validationDispatch] = useReducer(validationReducer, { errors: {}, success: {} })

  const broadcastValidateResults = useEvent(`${formId.current}-validate-result`)
  const notifyChildrenReady = useEvent(`${formId.current}-form-ready`)
  const updateChildState = useEvent(`${formId.current}-update-state`)
  const broadcastIndexCheck = useEvent(`${formId.current}-index-check`)
  const broadcastSetAllDirty = useEvent(`${formId.current}-set-all-dirty`)

  const handleChildData = useCallback(({ path, value, inputEvent, transformer }) => {
    if (!path) return
    let transformedValue = value
    if (transformer && typeof transformer === 'function') {
      transformedValue = transformer(value)
    }
    formDispatch({ type: 'set', path, payload: transformedValue })
    Subject.next(inputEvent, value)
  }, [formDispatch])

  const handleChildRegister = useCallback((inputEvent) => {
    childCount.current += 1
    Subject.next(`${inputEvent}-update-index`, childCount.current)
  }, [])

  const handleErrorReport = useCallback((report: ErrorReport) => {
    childErrorReports.current.push(report)
    if (childErrorReports.current.length === childCount.current) {
      const childrenWithErrors = filter(childErrorReports.current, { error: true })
      const firstError = minBy(childrenWithErrors, '_index')
      if (firstError) {
        Subject.next(`${firstError.inputEvent}-go-focus-yourself`)
      }
      childErrorReports.current = []
    }
  }, [])

  useEvent(`${formId.current}-register-self`, handleChildRegister)
  useEvent(`${formId.current}-data`, handleChildData)
  useEvent(`${formId.current}-error-report`, handleErrorReport)

  useEffect(() => {
    notifyChildrenReady(initialValues ?? {})
  }, [notifyChildrenReady, initialValues])

  const validateOnChange = useCallback(async (form, submit = false) => {
    try {
      if (!onValidate) {
        return {}
      }
      const results = await onValidate(form)
      const errors = get(results, 'errors')
      const success = get(results, 'success')
      validationDispatch({ type: 'errors', payload: errors })
      validationDispatch({ type: 'success', payload: success })
      if (errors || success) {
        broadcastValidateResults({ errors, success, submit: !!submit })
      }
      return { errors, success }
    } catch (err) {
      console.log(err)
      return { errors: {}, success: {} }
    }
  }, [broadcastValidateResults, onValidate])

  const submitForm = useCallback(async () => {
    if (runValidateOnSubmit) {
      broadcastSetAllDirty()
      const { errors } = await validateOnChange(form, true)
      if (errors && (Object.entries(errors).length > 0)) return
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

  const debouncedValidate = useCallback(debounce(validateOnChange, validationDelay), [broadcastValidateResults, onValidate])

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
    <FormContext.Provider value={formId.current}>
      <form onSubmit={e => {
        e.preventDefault()
        submitForm && submitForm()
      }}>
        {children}
      </form>
    </FormContext.Provider>
  )
}
