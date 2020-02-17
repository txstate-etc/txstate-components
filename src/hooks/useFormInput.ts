import { useContext, useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { FormContext } from '../components/Form'
import { useEvent } from './useEvent'
import shortid from 'shortid'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import isNil from 'lodash/isNil'

interface UseFormInputArgs {
  path: string
  extractor?: Function
  transformer?: Function
  initialValue?: any
}

interface UseFormReturn {
  onChange: (event: React.ChangeEvent) => void,
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
  const _id = useRef(shortid.generate())
  const _index = useRef<number>()
  const _error = useRef<string>()

  const [value, _setValue] = useState(() => {
    if (initialValue || initialValue === null) return initialValue
    return ''
  })
  const [, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [focus, setFocus] = useState(false)

  const [inputEvent, setInputEvent] = useState(`${formEvent}_${_id.current}`)

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
        error: _error.current ?? '',
        errClass: _error.current ?? 'txst-form-error'
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
      _broadcastIndexCheck(_index.current)
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
    submit && errorReport({ inputEvent, error: !!errorMessage, _index })
  }, [errorReport, inputEvent, path])

  const handleUpdateState = useCallback(state => {
    const updatedValue = get(state, path)
    if (updatedValue && updatedValue !== value) {
      handleChange({ value: updatedValue, path, inputEvent, transformer })
    }
  }, [handleChange, inputEvent, path, transformer, value])

  const handleUpdateIndex = useCallback((index: number) => {
    _index.current = index
  }, [])

  const handleIndexCheck = useCallback((index: number) => {
    const currentIndex = _index.current
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
    setInputEvent(`${formEvent}_${_id.current}`)
  }, [formEvent])

  const notifyFormValueChange = useCallback((...args) => {
    let value = get(args, '[1]')

    if (extractor && typeof extractor === 'function') {
      value = extractor(...args)
    }

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
