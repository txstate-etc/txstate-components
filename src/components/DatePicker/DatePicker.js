import React from 'react'
import {
  MuiPickersUtilsProvider,
  DatePicker as MuiDatePicker
} from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'

export const DatePicker = props => {
  const { value, onChange, variant, maxDate, minDate } = props
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <MuiDatePicker
        maxDate={maxDate}
        minDate={minDate}
        variant={variant}
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  )
}

DatePicker.defaultProps = {
  variant: 'dialog'
}
