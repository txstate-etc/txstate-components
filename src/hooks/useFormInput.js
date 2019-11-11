import { useContext, useRef, useState, useEffect, useCallback } from 'react'
import { FormContext } from '../components/Form'
import { useEvent } from './useEvent'
import uuid from 'uuid/v4'
import { get } from 'lodash'

export const useFormInput = ({ path, extractor, transformer, initialValue }) => {
  const formEvent = useContext(FormContext)
  const _id = useRef(uuid())
  const [value, setValue] = useState(() => {
    if (initialValue || initialValue === null) return initialValue
    return ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [inputEvent, setInputEvent] = useState(`${formEvent}_${_id.current}`)

  const [isDirty, setIsDirty] = useState(false)

  const handleChange = useCallback(useEvent(`${formEvent}-data`), [])

  const handleFormReady = useCallback((initialState) => {
    const initialValue = get(initialState, path)
    if (initialValue) {
      setValue(initialValue)
    }
  }, [setValue])

  const handleValidation = useCallback(result => {
    const errorMessage = get(result, `errors.${path}`)
    const successMessage = get(result, `success.${path}`)

    setError(errorMessage || '')
    setSuccess(successMessage || '')
  }, [setError])

  const handleUpdateState = useCallback(state => {
    const updatedValue = get(state, path)
    if (updatedValue !== value) {
      handleChange({ value: updatedValue, path, inputEvent, transformer })
    }
  }, [])

  useEvent(`${formEvent}-form-ready`, handleFormReady)
  useEvent(`${formEvent}-update-state`, handleUpdateState)
  useEvent(`${formEvent}-validate-result`, handleValidation)

  const updateFormValue = useCallback((value) => {
    setValue(value)
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
  }, [handleChange, extractor])

  const onBlur = useCallback(() => {
    if (!isDirty) setIsDirty(true)
  }, [setIsDirty, isDirty])

  return {
    onChange: notifyFormValueChange,
    onBlur,
    isDirty,
    value,
    error,
    success
  }
}
