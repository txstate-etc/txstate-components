import React from 'react'
import { BaseDateTimePicker } from '../../BaseDateTimePicker'
import { useFormInput } from '../../../hooks'

export const DateTimePicker = props => {
  const { path, initialValue = null, format, emptyLabel, variant } = props
  const {
    value,
    onChange
  } = useFormInput({
    path,
    initialValue,
    extractor: dateTime => dateTime,
    transformer: dateTime => dateTime.format(format)
  })
  return (
    <BaseDateTimePicker
      value={value}
      onChange={onChange}
      variant={variant}
      emptyLabel={emptyLabel}
    />
  )
}
