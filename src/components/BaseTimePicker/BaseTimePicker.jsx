import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DayjsUtils from '@date-io/dayjs'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

export const BaseTimePicker = props => {
  const { value, placeholder, disabled, onChange, mask, format, variant, emptyLabel } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        placeholder={placeholder}
        disabled={disabled}
        format={format}
        emptyLabel={emptyLabel}
        variant={variant}
        value={value}
        onChange={onChange}
        mask={mask}
      />
    </LocalizationProvider>
  )
}

BaseTimePicker.defaultProps = {
  variant: 'outlined',
  format: 'hh:mm a',
  mask: '__:__ _m',
  placeholder: '08:00 am'
}

BaseTimePicker.propTypes = {
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  emptyLabel: PropTypes.string,
  format: PropTypes.string,
  value: PropTypes.instanceOf(dayjs),
  onChange: PropTypes.func,
  mask: PropTypes.string,
  placeholder: PropTypes.string
}
