import React from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Label } from '@fluentui/react/lib/Label'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

const datePickerTheme = createTheme({
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Label>{label}</Label>
        <DatePicker
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
      </LocalizationProvider>
    </ThemeProvider>
  )
}

BaseDatePicker.defaultProps = {
  variant: 'filled',
  minDate: dayjs('1900-01-01'),
  maxDate: dayjs('2100-01-01'),
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
