import React, { useState, useCallback } from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

export const BaseTimePicker = props => {
  const { value, placeholder, disabled, onChange, mask, format, variant, emptyLabel } = props
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
      <KeyboardTimePicker
        placeholder={placeholder}
        disabled={disabled}
        format={format}
        emptyLabel={emptyLabel}
        variant={variant}
        value={value || _value}
        onChange={_onChange}
        mask={mask}
      />
    </MuiPickersUtilsProvider>
  )
}

BaseTimePicker.defaultProps = {
  variant: 'dialog',
  format: 'hh:mm a',
  mask: '__:__ _m',
  placeholder: '08:00 am'
}

BaseTimePicker.propTypes = {
  variant: PropTypes.oneOf(['dialog' | 'inline' | 'static']),
  emptyLabel: PropTypes.string,
  format: PropTypes.string,
  value: PropTypes.instanceOf(dayjs),
  onChange: PropTypes.func,
  mask: PropTypes.string,
  placeholder: PropTypes.string
}
