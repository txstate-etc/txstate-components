import React from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { useFormInput } from '../../../hooks'
import PropTypes from 'prop-types'

export const TextInput = props => {
  const { name, label, type, multiline, path, className, placeholder, required } = props

  const {
    value,
    error,
    onChange
  } = useFormInput({
    path,
    extractor: (e) => e.target.value
  })

  return (
    <TextField
      required={required}
      className={className}
      multiline={multiline}
      autoAdjustHeight={multiline}
      label={label}
      type={type}
      id={name}
      name={name}
      value={value}
      errorMessage={error}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

TextInput.defaultProps = {
  multiline: false,
  type: 'text'
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
  multiline: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
}
