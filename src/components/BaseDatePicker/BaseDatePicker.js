import React from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { Label } from 'office-ui-fabric-react/lib/Label'
import DayjsUtils from '@date-io/dayjs'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

// This is the available style options for the date picker
// import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

const datePickerTheme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        width: '100%'
      }
    },
    MuiPickersYear: {
      yearSelected: {
        color: '#000000DD'
      },
      root: {
        '&:focus': {
          color: '#501214'
        }
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#501214'
      }
    },
    MuiPickersDay: {
      day: {
        '&:hover': {
          backgroundColor: '#E8E3DB'
        }
      },
      current: {
        color: '#501214'
      },
      daySelected: {
        backgroundColor: '#9B7E05',
        '&:hover': {
          backgroundColor: '#B29006'
        }
      }
    }
  }
})

export const BaseDatePicker = props => {
  const { value, placeholder, disabled, onChange, mask, format, variant, emptyLabel, label, maxDate, minDate, minDateMessage, maxDateMessage } = props

  return (
    <ThemeProvider theme={datePickerTheme}>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <Label>{label}</Label>
        <KeyboardDatePicker
          autoOk
          mask={mask}
          format={format}
          placeholder={placeholder}
          disabled={disabled}
          emptyLabel={emptyLabel}
          maxDate={maxDate}
          minDate={minDate}
          variant={variant}
          value={value}
          invalidDateMessage=''
          minDateMessage={minDateMessage || `Date should not be before ${dayjs(minDate).format(format)}`}
          maxDateMessage={maxDateMessage || `Date should not be after ${dayjs(maxDate).format(format)}`}
          onChange={onChange}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

BaseDatePicker.defaultProps = {
  variant: 'dialog',
  minDate: dayjs('1900-01-01').toDate(),
  maxDate: dayjs('2100-01-01').toDate(),
  format: 'MM/DD/YYYY',
  mask: '__/__/____',
  placeholder: '10/31/2019'
}

BaseDatePicker.propTypes = {
  variant: PropTypes.oneOf(['dialog', 'inline', 'static']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minDateMessage: PropTypes.string,
  maxDateMessage: PropTypes.string,
  emptyLabel: PropTypes.string,
  format: PropTypes.string,
  value: PropTypes.instanceOf(dayjs),
  onChange: PropTypes.func,
  mask: PropTypes.string,
  label: PropTypes.string
}
