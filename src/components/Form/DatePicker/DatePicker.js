import React from 'react'
import { useFormInput } from '../../../hooks'
import { BaseDatePicker } from '../../BaseDatePicker'

export const DatePicker = props => {
  const { path, initialValue, format, emptyLabel, variant } = props
  const { value, onChange } = useFormInput({
    path,
    initialValue,
    extractor: date => date,
    transformer: date => date.format(format)
  })

  return (
    <BaseDatePicker
      value={value}
      onChange={onChange}
      variant={variant}
      emptyLabel={emptyLabel}
    />
  )
}
