import { useContext, useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { FormContext } from '../components/Form'
import { useEvent } from './useEvent'
import uuid from 'uuid/v4'
import get from 'lodash/get'
import debounce from 'lodash/debounce'

export const useFormInput = ({ path, extractor, transformer, initialValue }) => {
  const formEvent = useContext(FormContext)
  const _id = useRef(uuid())
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
  }, [_broadcastChange, isDirty, setDirty])

  const registerSelf = useEvent(`${formEvent}-register-self`)
  const errorReport = useEvent(`${formEvent}-error-report`)

  const handleFormReady = useCallback((initialState) => {
    const initialValue = get(initialState, path)
    if (initialValue) {
      setValue(initialValue)
    }
    registerSelf(inputEvent)
  }, [setValue, inputEvent, registerSelf])

  const handleValidation = useCallback(result => {
    const errorMessage = get(result, `errors.${path}`)
    const successMessage = get(result, `success.${path}`)
    const submit = get(result, 'submit')

    setError(errorMessage || '')
    setSuccess(successMessage || '')
    submit && errorReport({ inputEvent, _index, error: !!errorMessage })
  }, [setError, setSuccess])

  const handleUpdateState = useCallback(state => {
    const updatedValue = get(state, path)
    if (updatedValue && updatedValue !== value) {
      handleChange({ value: updatedValue, path, inputEvent, transformer })
    }
  }, [])

  const handleUpdateIndex = useCallback((index) => {
    _index.current = index
  }, [])

  const handleIndexCheck = useCallback((index) => {
    if (_index.current !== null && _index.current <= index && !isDirty) {
      setDirty(true)
    }
  }, [setDirty])

  const handleSetAllDirty = useCallback(() => {
    setDirty(true)
  }, [setDirty])

  // Trigger useEffect in component that focuses input. Don't leave it on so that it can be set again
  const handleFocus = useCallback(() => {
    if (typeof componentRef.current.focus === 'function') { componentRef.current.focus() }
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
  }, [value, setValue])

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
  }, [handleChange, extractor])

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
