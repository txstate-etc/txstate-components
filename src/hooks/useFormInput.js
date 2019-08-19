import { useContext, useRef, useState, useEffect, useCallback } from 'react'
import { FormContext } from '../components/Form'
import { useEvent } from './useEvent'
import uuid from 'uuid/v4'
import debounce from 'lodash.debounce'
import get from 'lodash.get'

export const useFormInput = ({ path, extractor, transformer, onGetErrorMessage, initialValue }) => {
  const formEvent = useContext(FormContext)
  const _id = useRef(uuid())
  const [value, setValue] = useState(() => {
    if (initialValue || initialValue === null) return initialValue
    return ''
  })
  const [error, setError] = useState('')
  const [inputEvent, setInputEvent] = useState(`${formEvent}_${_id.current}`)

  const handleChange = useEvent(`${formEvent}-data`)
  const handleError = useEvent(`${formEvent}-error`)

  const getErrorMessage = useCallback(debounce(async (e, value) => {
    let error = ''
    try {
      error = await onGetErrorMessage(e, value) || ''
    } catch {
      error = ''
    }

    setError(error)
  }, 300), [onGetErrorMessage, setError])

  useEffect(() => {
    if (error.length > 0) {
      handleError({ path, error, type: 'set' })
    } else {
      handleError({ path, error, type: 'remove' })
    }
  }, [error])

  const updateFormValue = useCallback((value) => {
    setValue(value)
  }, [setValue])

  useEvent(inputEvent, updateFormValue)

  useEffect(() => {
    setInputEvent(`${formEvent}_${_id.current}`)
  }, [formEvent])

  const notifyFormValueChange = useCallback((...args) => {
    const event = get(args, '[0]')
    let value = get(args, '[1]')
    const hasExtractor = extractor && typeof extractor === 'function'

    if (hasExtractor) {
      value = extractor(...args)
    }

    getErrorMessage.cancel()
    getErrorMessage(event, value)
    handleChange({ value, path, inputEvent, transformer })
  }, [handleChange, getErrorMessage, extractor])

  const handleOnBlur = useCallback(e => {
    let value = e
    if (extractor && typeof extractor === 'function') {
      value = extractor(e)
    }
    getErrorMessage.cancel()
    getErrorMessage(e, value)
  }, [getErrorMessage, extractor])

  return {
    onBlur: handleOnBlur,
    onChange: notifyFormValueChange,
    value,
    error
  }
}
