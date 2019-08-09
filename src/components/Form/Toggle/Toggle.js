import React from 'react'
import { useFormInput } from '../../../hooks'
import { Switch } from '../../Switch'

export const Toggle = props => {
  const { label, size, path } = props

  const {
    onChange
  } = useFormInput({
    path,
    extractor: value => value
  })

  return (
    <Switch
      label={label}
      size={size}
      onValueChange={onChange}
    />
  )
}
