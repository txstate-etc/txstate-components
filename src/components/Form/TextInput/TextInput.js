import React from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import PropTypes from 'prop-types'
import { useFormInput } from '../../../hooks'

export const TextInput = props => {

  const { name, label, type, multiline, path, className, placeholder, required, disabled, iconProps } = props

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
      iconProps={iconProps}
      disabled={disabled}
    />
  )
}

TextInput.defaultProps = {
  multiline: false,
  type: 'text'
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
  multiline: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  iconProps: PropTypes.shape({
    ariaLabel: PropTypes.string,
    iconName: PropTypes.string,
    iconType: PropTypes.object,
    imageProps: PropTypes.object,
    styles: PropTypes.object,
    theme: PropTypes.object
  })
}
