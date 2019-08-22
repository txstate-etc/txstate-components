import React from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { useFormInput } from '../../../hooks'

export const TextInput = props => {
  const { name, label, multiline, onGetErrorMessage, path, className, placeholder } = props

  const {
    value,
    error,
    onChange
  } = useFormInput({
    path,
    onGetErrorMessage,
    extractor: (e) => e.target.value
  })

  return (
    <TextField
      className={className}
      multiline={multiline}
      autoAdjustHeight={multiline}
      label={label}
      type='text'
      id={name}
      name={name}
      value={value}
      errorMessage={error}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

TextInput.defaultProps = {
  multiline: false
}
