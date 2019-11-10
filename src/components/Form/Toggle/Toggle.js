import React from 'react'
import { useFormInput } from '../../../hooks'
import { Switch } from '../../Switch'
import PropTypes from 'prop-types'
import { ErrorMessage } from '../ErrorMessage'

export const Toggle = props => {
  const { label, size, path, defaultOn } = props

  const {
    onChange,
    error
  } = useFormInput({
    path,
    extractor: value => value
  })

  return <React.Fragment>
    <Switch
      size={size}
      label={label}
      onValueChange={onChange}
      on={defaultOn}
    />
    {error ? <ErrorMessage error={error} /> : null}
  </React.Fragment>
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
