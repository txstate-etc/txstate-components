import React, { useContext, useRef, useState, useEffect, useCallback } from 'react'
import { Context } from '../Form'
import { useEvent } from '../../../hooks'
import styled from 'styled-components'
import debounce from 'lodash.debounce'
import uuid from 'uuid/v4'

const Error = styled.span`
  color: red;
  display: block;
`

const Input = styled.input.attrs(() => ({ type: 'text' }))`
  height: 20px;
  margin: 4px 0;
`

const Label = styled.label`
  display: block;
  margin-bottom: 2px;
`

// Value extractor
// Path required

const useFormInput = ({ path, extractor, onGetErrorMessage }) => {
  const formEvent = useContext(Context)
  const _id = useRef(uuid())
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [inputEvent, setInputEvent] = useState(`${formEvent}_${_id.current}`)

  const getErrorMessage = useCallback(debounce(async (e, value) => {
    let error = ''
    try {
      error = await onGetErrorMessage(e, value) || ''
    } catch {
      error = ''
    }
    setError(error)
  }, 300), [onGetErrorMessage, setError])

  const handleChange = useEvent(`${formEvent}-data`)

  const updateFormValue = useCallback((value) => {
    setValue(value)
  }, [setValue])

  useEvent(inputEvent, updateFormValue)

  useEffect(() => {
    setInputEvent(`${formEvent}_${_id.current}`)
  }, [formEvent])

  const notifyFormValueChange = useCallback(e => {
    const value = extractor(e)
    getErrorMessage.cancel()
    getErrorMessage(e, value)
    handleChange({ value, path, inputEvent })
  }, [handleChange, getErrorMessage, extractor])

  const handleOnBlur = useCallback(e => {
    const value = extractor(e)
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

export const TextInput = props => {
  const { name, label, onGetErrorMessage } = props
  if (!name) throw new Error('All form elements must have a name.')

  const {
    value,
    error,
    onBlur,
    onChange
  } = useFormInput({
    path: name,
    onGetErrorMessage,
    extractor: (e) => e.target.value
  })

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type='text'
        onBlur={onBlur}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      <Error>{error}</Error>
    </>
  )
}
