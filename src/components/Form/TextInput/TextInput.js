import React from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { useFormInput } from '../../../hooks'

export const TextInput = props => {
  const { name, label, multiline, onGetErrorMessage, path } = props

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
    <TextField
      multiline={multiline}
      autoAdjustHeight={multiline}
      label={label}
      type='text'
      onBlur={onBlur}
      id={name}
      name={name}
      value={value}
      errorMessage={error}
      onChange={onChange}
    />
  )
}

TextInput.defaultProps = {
  multiline: false
}
