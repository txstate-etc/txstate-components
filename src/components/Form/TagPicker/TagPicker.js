import React from 'react'
import { BasePicker } from '../../BasePicker'
import PropTypes from 'prop-types'
import { useFormInput } from '../../../hooks'
import { ErrorMessage } from '../ErrorMessage'

export const TagPicker = props => {
  const { ariaLabel, label, path, itemLimit, items, className } = props

  const {
    value,
    error,
    onChange
  } = useFormInput({
    path,
    initialValue: [],
    extractor: (e) => {
      return e
    }
  })

  return <React.Fragment>
    <BasePicker
      className={className}
      value={value}
      onChange={onChange}
      items={items}
      ariaLabel={ariaLabel}
      itemLimit={itemLimit}
      label={label}
    />
    {error ? <ErrorMessage error={error} /> : null}
  </React.Fragment>
}

TagPicker.defaultProps = {

}

TagPicker.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
  itemLimit: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, name: PropTypes.string }))
}
