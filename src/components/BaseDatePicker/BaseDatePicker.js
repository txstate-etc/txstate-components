import React from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import { Label } from 'office-ui-fabric-react/lib/Label'
import DayjsUtils from '@date-io/dayjs'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

export const BaseDatePicker = props => {
  const { value, placeholder, disabled, onChange, mask, format, variant, emptyLabel, label, maxDate, minDate } = props

  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Label>{label}</Label>
      <KeyboardDatePicker
        mask={mask}
        format={format}
        placeholder={placeholder}
        disabled={disabled}
        emptyLabel={emptyLabel}
        maxDate={maxDate}
        minDate={minDate}
        variant={variant}
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  )
}

BaseDatePicker.defaultProps = {
  variant: 'dialog',
  minDate: new Date('1900-01-01'),
  maxDate: new Date('2100-01-01'),
  format: 'MM/DD/YYYY',
  mask: '__/__/____',
  placeholder: '10/31/2019'
}

BaseDatePicker.propTypes = {
  variant: PropTypes.oneOf(['dialog', 'inline', 'static']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  emptyLabel: PropTypes.string,
  format: PropTypes.string,
  value: PropTypes.instanceOf(dayjs),
  onChange: PropTypes.func,
  mask: PropTypes.string
}
