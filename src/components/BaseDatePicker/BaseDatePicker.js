import React from 'react'
import {
  MuiPickersUtilsProvider,
  DatePicker as MuiDatePicker
} from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'

export const BaseDatePicker = props => {
  const { value, onChange, variant, emptyLabel, maxDate, minDate } = props
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <MuiDatePicker
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
  variant: 'dialog'
}
