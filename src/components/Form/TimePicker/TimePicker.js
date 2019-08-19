import React from 'react'
import { BaseTimePicker } from '../../BaseTimePicker'
import { useFormInput } from '../../../hooks'

export const TimePicker = props => {
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
    <BaseTimePicker
      value={value}
      onChange={onChange}
      variant={variant}
      emptyLabel={emptyLabel}
    />
  )
}

TimePicker.defaultProps = {
  format: 'HH:mm:ssZ'
}
