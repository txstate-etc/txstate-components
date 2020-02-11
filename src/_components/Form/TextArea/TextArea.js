import React from 'react'
import { TextInput } from '../TextInput'
import PropTypes from 'prop-types'

export const TextArea = props => {
  const { name, label, path, styles, placeholder, className } = props

  return (
    <TextInput
      className={className}
      styles={styles}
      placeholder={placeholder}
      name={name}
      label={label}
      multiline
      path={path}
    />
  )
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  styles: PropTypes.object,
  className: PropTypes.string
}
