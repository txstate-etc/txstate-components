import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

export const BaseDateTimePicker = props => {
  const { value, onChange, format, disabled, variant, placeholder, mask, maxDate, minDate } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        placeholder={placeholder}
        disabled={disabled}
        format={format}
        mask={mask}
        maxDate={maxDate}
        minDate={minDate}
        variant={variant}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  )
}

BaseDateTimePicker.defaultProps = {
  variant: 'dialog',
  minDate: dayjs('1900-01-01'),
  maxDate: dayjs('2100-01-01'),
  placeholder: '10/31/2019 08:00 am',
  format: 'MM/DD/YYYY hh:mm a',
  mask: '__/__/____ __:__ _m'
}

BaseDateTimePicker.propTypes = {
  variant: PropTypes.oneOf(['dialog', 'inline', 'static']),
  disabled: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  format: PropTypes.string,
  value: PropTypes.instanceOf(dayjs),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  mask: PropTypes.string
}
