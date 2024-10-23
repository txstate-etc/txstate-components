import React, { useMemo } from 'react'
import { useFormInput } from '../../../hooks'
import { BaseDatePicker } from '../../BaseDatePicker'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { ErrorMessage } from '../ErrorMessage'

export const DatePicker = props => {
  const {
    path,
    initialValue,
    minDateMessage,
    maxDateMessage,
    label,
    emptyLabel,
    disabled = false,
    variant = 'dialog',
    mask = '__/__/____',
    format = 'MM/DD/YYYY',
    placeholder = '10/31/2019',
    displayFormat = 'MM/DD/YYYY',
    minDate = dayjs('1900-01-01'),
    maxDate = dayjs('2099-01-01')
  } = props

  const initialDate = useMemo(() => {
    if (initialValue === null) return null
    if (initialValue === undefined) return dayjs()
    return initialValue
  }, [initialValue])

  const { value, error, success, onChange } = useFormInput({
    path,
    initialValue: initialDate,
    extractor: date => date,
    transformer: date => date && date.format(format)
  })

  return <React.Fragment>
    <BaseDatePicker
      value={value}
      label={label}
      onChange={onChange}
      variant={variant}
      format={displayFormat}
      emptyLabel={emptyLabel}
      mask={mask}
      placeholder={placeholder}
      minDate={minDate}
      maxDate={maxDate}
      minDateMessage={minDateMessage}
      maxDateMessage={maxDateMessage}
      disabled={disabled}
    />
    <ErrorMessage error={error} success={success} />
  </React.Fragment>
}

DatePicker.propTypes = {
  variant: PropTypes.oneOf(['dialog', 'inline', 'static']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minDateMessage: PropTypes.string,
  maxDateMessage: PropTypes.string,
  initialValue: PropTypes.instanceOf(Date),
  emptyLabel: PropTypes.string,
  displayFormat: PropTypes.string,
  format: PropTypes.string,
  mask: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  path: PropTypes.string.isRequired,
  label: PropTypes.string
}
