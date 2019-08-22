import React from 'react'
import { ChoiceGroup } from '../../ChoiceGroup'
import { useFormInput } from '../../../hooks'
import PropTypes from 'prop-types'

export const RadioGroup = props => {
  const { path, label, options, ariaLabel, required, onGetErrorMessage, initialValue } = props

  const {
    value,
    onChange
  } = useFormInput({
    path,
    onGetErrorMessage,
    initialValue,
    extractor: (event, value) => value
  })

  return (
    <ChoiceGroup
      options={options}
      ariaLabel={ariaLabel}
      label={label}
      required={required}
      onChange={onChange}
      selectedKey={value.key}
    />
  )
}

RadioGroup.propTypes = {
  path: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string
    })
  )
}
