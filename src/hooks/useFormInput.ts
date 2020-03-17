import { useContext, useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { FormContext } from '../components/Form/Form'
import { useEvent } from './useEvent'
import nanoid from 'nanoid'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import isNil from 'lodash/isNil'

interface UseFormInputArgs {
  path: string
  extractor: (...args: any[]) => any
  transformer?: Function
  initialValue?: any
}

interface UseFormReturn {
  onChange: (event: any) => void,
  onBlur: Function,
  isDirty: boolean,
  value: any,
  error: string,
  success: string,
  errClass?: string,
  focus: boolean
}

type UseFormInput = (args: UseFormInputArgs) => UseFormReturn

export const useFormInput: UseFormInput = ({ path, extractor, transformer, initialValue }) => {
  const formEvent = useContext(FormContext)
  const inputId = useRef(nanoid(10))
  const inputIndex = useRef<number>()

  const [value, _setValue] = useState(() => {
    if (initialValue !== undefined) return initialValue
    return null
  })
  const [_error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [focus, setFocus] = useState(false)

  const [inputEvent, setInputEvent] = useState(`${formEvent}_${inputId.current}`)

  const [isDirty, _setDirty] = useState(false)

  const setDirty = useCallback(debounce((value: boolean) => {
    if (value !== isDirty) {
      _setDirty(value)
    }
  }, 400), [_setDirty, isDirty])

  const setValue = useCallback((updatedValue) => {
    if (updatedValue !== value) _setValue(updatedValue)
  }, [_setValue, value])

  const { error, errClass } = useMemo(() => {
    if (isDirty) {
      return {
        error: _error ?? '',
        errClass: _error ?? 'txst-form-error'
      }
    }
    return { error: '' }
  }, [_error, isDirty])

  const _broadcastChange = useEvent(`${formEvent}-data`)
  const _broadcastIndexCheck = useEvent(`${formEvent}-index-check`)

  const handleChange = useCallback((value) => {
    _broadcastChange(value)
    if (!isDirty) {
      setDirty.cancel()
      setDirty(true)
      _broadcastIndexCheck(inputIndex.current)
    }
  }, [_broadcastChange, _broadcastIndexCheck, isDirty, setDirty])

  const registerSelf = useEvent(`${formEvent}-register-self`)
  const errorReport = useEvent(`${formEvent}-error-report`)

  const handleFormReady = useCallback((initialState) => {
    const initialValue = get(initialState, path)
    if (initialValue) {
      setValue(initialValue)
    }
    registerSelf(inputEvent)
  }, [path, registerSelf, inputEvent, setValue])

  const handleValidation = useCallback(result => {
    const errorMessage = get(result, `errors.${path}`)
    const successMessage = get(result, `success.${path}`)
    const submit = get(result, 'submit')

    setError(errorMessage || '')
    setSuccess(successMessage || '')
    submit && errorReport({ inputEvent, error: !!errorMessage, _index: inputIndex })
  }, [errorReport, inputEvent, path])

  const handleUpdateState = useCallback(state => {
    const updatedValue = get(state, path)
    if (updatedValue && updatedValue !== value) {
      handleChange({ value: updatedValue, path, inputEvent, transformer })
    }
  }, [handleChange, inputEvent, path, transformer, value])

  const handleUpdateIndex = useCallback((index: number) => {
    inputIndex.current = index
  }, [])

  const handleIndexCheck = useCallback((index: number) => {
    const currentIndex = inputIndex.current
    if (!isNil(currentIndex) && currentIndex <= index && !isDirty) {
      setDirty(true)
    }
  }, [isDirty, setDirty])

  const handleSetAllDirty = useCallback(() => {
    setDirty(true)
  }, [setDirty])

  // Trigger useEffect in component that focuses input. Don't leave it on so that it can be set again
  const handleFocus = useCallback(() => {
    setFocus(true)
    setFocus(false)
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
    setInputEvent(`${formEvent}_${inputId.current}`)
  }, [formEvent])

  const notifyFormValueChange = useCallback((...args) => {
    if (!extractor?.apply) {
      throw new Error('An extractor function is required, it should retrieve the value from the input')
    }
    const value = extractor.apply(null, args)

    handleChange({ value, path, inputEvent, transformer })
  }, [extractor, handleChange, path, inputEvent, transformer])

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
    focus
  }
}
