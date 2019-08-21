import React, { useState, useCallback } from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

export const BaseDateTimePicker = props => {
  const { value, onChange, format, disabled, variant, placeholder, mask, maxDate, minDate } = props

  const [_value, _setValue] = useState()

  const _onChange = useCallback((value) => {
    if (!onChange) {
      _setValue(value)
    } else {
      onChange(value)
    }
  }, [onChange, _setValue])

  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <KeyboardDateTimePicker
        placeholder={placeholder}
        disabled={disabled}
        format={format}
        mask={mask}
        maxDate={maxDate}
        minDate={minDate}
        variant={variant}
        value={value || _value}
        onChange={_onChange}
      />
    </MuiPickersUtilsProvider>
  )
}

BaseDateTimePicker.defaultProps = {
  variant: 'dialog',
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  placeholder: '10/31/2019 08:00 am',
  format: 'MM/DD/YYYY hh:mm a',
  mask: '__/__/____ __:__ _m'
}

BaseDateTimePicker.propTypes = {
  variant: PropTypes.oneOf(['dialog' | 'inline' | 'static']),
  disabled: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  format: PropTypes.string,
  value: PropTypes.instanceOf(dayjs),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  mask: PropTypes.string
}
