import React from 'react'
import { useFormInput } from '../../../hooks'
import { Switch } from '../../Switch'
import PropTypes from 'prop-types'

export const Toggle = props => {
  const { label, size, path, defaultOn } = props

  const {
    onChange
  } = useFormInput({
    path,
    extractor: value => value
  })

  return (
    <Switch
      size={size}
      label={label}
      onValueChange={onChange}
      on={defaultOn}
    />
  )
}

Toggle.defaultProps = {
  size: 'small',
  defaultOn: false
}

Toggle.propTypes = {
  path: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
  defaultOn: PropTypes.bool,
  label: PropTypes.string
}
