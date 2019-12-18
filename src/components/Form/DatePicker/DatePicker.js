import React from 'react'
import { useFormInput } from '../../../hooks'
import { BaseDatePicker } from '../../BaseDatePicker'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { ErrorMessage } from '../ErrorMessage'

export const DatePicker = props => {
  const {
    path,
    initialValue,
    mask,
    minDate,
    maxDate,
    displayFormat,
    placeholder,
    label,
    format,
    emptyLabel,
    disabled,
    variant
  } = props

  const { value, error, success, onChange } = useFormInput({
    path,
    initialValue: initialValue || dayjs(),
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
      disabled={disabled}
    />
    <ErrorMessage error={error} success={success} />
  </React.Fragment>
}

DatePicker.defaultProps = {
  variant: 'dialog',
  minDate: new Date('1900-01-01'),
  maxDate: new Date('2100-01-01'),
  displayFormat: 'MM/DD/YYYY',
  format: 'MM/DD/YYYY',
  mask: '__/__/____',
  placeholder: '10/31/2019',
  disabled: false
}

DatePicker.propTypes = {
  variant: PropTypes.oneOf(['dialog', 'inline', 'static']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  emptyLabel: PropTypes.string,
  displayFormat: PropTypes.string,
  format: PropTypes.string,
  mask: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  path: PropTypes.string.isRequired
}
