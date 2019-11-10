import React from 'react'
import { BaseTimePicker } from '../../BaseTimePicker'
import { useFormInput } from '../../../hooks'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { ErrorMessage } from '../ErrorMessage'

export const TimePicker = props => {
  const {
    path,
    initialValue,
    format,
    emptyLabel,
    mask,
    disabled,
    displayFormat,
    placeholder,
    variant
  } = props

  const {
    value,
    error,
    onChange
  } = useFormInput({
    path,
    initialValue,
    extractor: time => time,
    transformer: time => time && time.format(format)
  })

  return <React.Fragment>
    <BaseTimePicker
      value={value}
      onChange={onChange}
      variant={variant}
      emptyLabel={emptyLabel}
      placeholder={placeholder}
      format={displayFormat}
      mask={mask}
      disabled={disabled}
    />
    {error ? <ErrorMessage error={error} /> : null}
  </React.Fragment>
}

TimePicker.defaultProps = {
  variant: 'dialog',
  displayFormat: 'hh:mm a',
  placeholder: '08:00 am',
  format: 'HH:mm:ssZ',
  mask: '__:__ _m',
  disabled: false,
  initialValue: dayjs()
}

TimePicker.propTypes = {
  initialValue: PropTypes.instanceOf(dayjs),
  emptyLabel: PropTypes.string,
  displayFormat: PropTypes.string,
  format: PropTypes.string,
  mask: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
}
