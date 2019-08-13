import React from 'react'
import styled from 'styled-components'
import { useFormInput } from '../../../hooks'

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

export const TextInput = props => {
  const { name, label, onGetErrorMessage, path } = props

  const {
    value,
    error,
    onBlur,
    onChange
  } = useFormInput({
    path,
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
