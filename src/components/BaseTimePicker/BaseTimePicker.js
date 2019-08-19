import React from 'react'
import {
  MuiPickersUtilsProvider,
  TimePicker
} from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'

export const BaseTimePicker = props => {
  const { value, onChange, variant } = props
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <TimePicker
        variant={variant}
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  )
}

BaseTimePicker.defaultProps = {
  variant: 'dialog'
}
