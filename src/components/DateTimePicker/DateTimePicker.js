import React from 'react'
import {
  MuiPickersUtilsProvider,
  DateTimePicker as MuiDateTimePicker
} from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'

export const DateTimePicker = props => {
  const { value, onChange, variant, maxDate, minDate } = props
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <MuiDateTimePicker
        maxDate={maxDate}
        minDate={minDate}
        variant={variant}
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  )
}

DateTimePicker.defaultProps = {
  variant: 'dialog'
}
