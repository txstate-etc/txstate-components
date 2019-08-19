import React from 'react'
import {
  MuiPickersUtilsProvider,
  DateTimePicker as MuiDateTimePicker
} from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'

export const BaseDateTimePicker = props => {
  const { value, onChange, variant, maxDate, minDate, emptyLabel } = props
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <MuiDateTimePicker
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

BaseDateTimePicker.defaultProps = {
  variant: 'dialog'
}
