import { useContext, useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { FormContext } from '../components/Form'
import { useEvent } from './useEvent'
import { v4 as uuidv4 } from 'uuid'
import get from 'lodash/get'
import debounce from 'lodash/debounce'

export const useFormInput = ({ path, extractor, transformer, initialValue }) => {
  const formEvent = useContext(FormContext)
  const _id = useRef(uuidv4())
  const _index = useRef(null)
  const componentRef = useRef()

  const [value, _setValue] = useState(() => {
    if (initialValue || initialValue === null) return initialValue
    return ''
  })
  const [_error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [inputEvent, setInputEvent] = useState(`${formEvent}_${_id.current}`)

  const [isDirty, setIsDirty] = useState(false)

  const setDirty = useCallback(debounce((value) => {
    if (value !== isDirty) {
      setIsDirty(value)
    }
  }, 400), [setIsDirty, isDirty])

  const setValue = useCallback((updatedValue) => {
    if (updatedValue !== value) _setValue(updatedValue)
  }, [_setValue, value])

  const { error, errClass } = useMemo(() => {
    return isDirty ? {
      error: _error,
      errClass: _error ? 'txst-form-error' : undefined
    } : { error: '', errClass: undefined }
  }, [_error, isDirty])

  const _broadcastChange = useEvent(`${formEvent}-data`)
  const _broadcastIndexCheck = useEvent(`${formEvent}-index-check`)

  const handleChange = useCallback((value) => {
    _broadcastChange(value)
    if (!isDirty) {
      setDirty.cancel()
      setDirty(true)
      _broadcastIndexCheck(_index.current)
    }
  }, [_broadcastChange, isDirty, setDirty, _broadcastIndexCheck])

  const handleDeliverValue = useCallback((formValue) => {
    if (formValue && formValue !== value) {
      _setValue(formValue)
    }
  }, [value])
  useEvent(`${inputEvent}-deliver-value`, handleDeliverValue)

  const requestValue = useEvent(`${formEvent}-request-value`)
  const handleCheckFormReady = useCallback((isReady) => {
    if (isReady) {
      requestValue(path, inputEvent)
    }
  }, [requestValue, path, inputEvent])
  useEvent(`${formEvent}-deliver-form-ready`, handleCheckFormReady)

  const registerSelf = useEvent(`${formEvent}-register-self`)
  const errorReport = useEvent(`${formEvent}-error-report`)
  const checkFormReady = useEvent(`${formEvent}-check-form-ready`)

  useEffect(() => {
    checkFormReady()
  }, [checkFormReady])

  const handleFormReady = useCallback((initialState) => {
    const initialValue = get(initialState, path)
    if (initialValue) {
      setValue(initialValue)
    }
    registerSelf(inputEvent)
  }, [setValue, inputEvent, registerSelf, path])

  const handleValidation = useCallback(result => {
    setError('') // reset error / success so that aria-live re-read the error if it still exists
    setSuccess('')
    const errorMessage = get(result, `errors.${path}`)
    const successMessage = get(result, `success.${path}`)
    const submit = get(result, 'submit')

    setError(errorMessage || '')
    setSuccess(successMessage || '')
    submit && errorReport({ inputEvent, _index, error: !!errorMessage })
  }, [setError, setSuccess, errorReport, inputEvent, path])

  const handleUpdateState = useCallback(state => {
    const updatedValue = get(state, path)
    if (updatedValue && updatedValue !== value) {
      handleChange({ value: updatedValue, path, inputEvent, transformer })
    }
  }, [path, inputEvent, transformer, handleChange, value])

  const handleUpdateIndex = useCallback((index) => {
    _index.current = index
  }, [])

  const handleIndexCheck = useCallback((index) => {
    if (_index.current !== null && _index.current <= index && !isDirty) {
      setDirty(true)
    }
  }, [setDirty, isDirty])

  const handleSetAllDirty = useCallback(() => {
    setDirty(true)
  }, [setDirty])

  const handleFocus = useCallback(() => {
    if (typeof componentRef.current.focusInput === 'function') { componentRef.current.focusInput() } else if (typeof componentRef.current.focus === 'function') { componentRef.current.focus() }
  }, [])

  useEvent(`${formEvent}-form-ready`, handleFormReady)
  useEvent(`${formEvent}-update-state`, handleUpdateState)
  useEvent(`${formEvent}-validate-result`, handleValidation)
  useEvent(`${inputEvent}-update-index`, handleUpdateIndex)
  useEvent(`${formEvent}-index-check`, handleIndexCheck)
  useEvent(`${formEvent}-set-all-dirty`, handleSetAllDirty)
  useEvent(`${inputEvent}-go-focus-yourself`, handleFocus)

  const updateFormValue = useCallback((updatedValue) => {
    setValue(updatedValue)
  }, [setValue])

  useEvent(inputEvent, updateFormValue)

  useEffect(() => {
    setInputEvent(`${formEvent}_${_id.current}`)
  }, [formEvent])

  const notifyFormValueChange = useCallback((...args) => {
    let value = get(args, '[1]')
    const hasExtractor = extractor && typeof extractor === 'function'

    if (hasExtractor) {
      value = extractor(...args)
    }

    handleChange({ value, path, inputEvent, transformer })
  }, [handleChange, extractor, inputEvent, path, transformer])

  const onBlur = useCallback(() => {
    setDirty(true)
  }, [setDirty])

  return {
    onChange: notifyFormValueChange,
    onBlur,
    isDirty,
    value,
    error,
    success,
    errClass,
    componentRef
  }
}
