import { useContext, useRef, useState, useEffect, useCallback } from 'react'
import { FormContext } from '../components/Form'
import { useEvent } from './useEvent'
import uuid from 'uuid/v4'
import get from 'lodash.get'

export const useFormInput = ({ path, extractor, transformer, initialValue }) => {
  const formEvent = useContext(FormContext)
  const _id = useRef(uuid())
  const [value, setValue] = useState(() => {
    if (initialValue || initialValue === null) return initialValue
    return ''
  })
  const [error, setError] = useState('')

  const [inputEvent, setInputEvent] = useState(`${formEvent}_${_id.current}`)

  const handleChange = useCallback(useEvent(`${formEvent}-data`), [])

  const handleFormReady = useCallback((initialState) => {
    const initialValue = get(initialState, path)
    if (initialValue) {
      setValue(initialValue)
    }
  }, [setValue])

  const handleValidation = useCallback(result => {
    const errorMessage = get(result, path)
    setError(errorMessage || '')
  }, [setError])

  useEvent(`${formEvent}-form-ready`, handleFormReady)
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

  return {
    onChange: notifyFormValueChange,
    value,
    error
  }
}
