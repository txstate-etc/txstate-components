import React from 'react'
import { TextInput } from '../TextInput'

export const TextArea = props => {
  const { name, label, onGetErrorMessage, path } = props

  return (
    <TextInput
      name={name}
      label={label}
      multiline
      path={path}
      onGetErrorMessage={onGetErrorMessage}
    />
  )
}
