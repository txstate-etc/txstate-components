import React from 'react'
import { BaseDateTimePicker } from '../../BaseDateTimePicker'
import { useFormInput } from '../../../hooks'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

export const DateTimePicker = props => {
  const { path, initialValue, displayFormat, format, emptyLabel, variant } = props
  const {
    value,
    onChange
  } = useFormInput({
    path,
    initialValue,
    extractor: dateTime => dateTime,
    transformer: dateTime => dateTime && dateTime.format(format)
  })
  return (
    <BaseDateTimePicker
      format={displayFormat}
      value={value}
      onChange={onChange}
      variant={variant}
      emptyLabel={emptyLabel}
    />
  )
}

DateTimePicker.defaultProps = {
  variant: 'dialog',
  minDate: new Date('1900-01-01'),
  maxDate: new Date('2100-01-01'),
  displayFormat: 'MM/DD/YYYY hh:mm a',
  placeholder: '10/31/2019 08:00 am',
  format: 'MM/DD/YYYY hh:mm a',
  mask: '__/__/____ __:__ _m',
  disabled: false,
  initialValue: dayjs()
}

DateTimePicker.propTypes = {
  variant: PropTypes.oneOf(['dialog', 'inline', 'static']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  initialValue: PropTypes.instanceOf(dayjs),
  emptyLabel: PropTypes.string,
  displayFormat: PropTypes.string,
  format: PropTypes.string,
  mask: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
}
