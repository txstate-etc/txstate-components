import React from 'react'
import {
  MuiPickersUtilsProvider,
  TimePicker as MuiTimePicker
} from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'

export const TimePicker = props => {
  const { value, onChange, variant } = props
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <MuiTimePicker
        variant={variant}
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  )
}

TimePicker.defaultProps = {
  variant: 'dialog'
}
