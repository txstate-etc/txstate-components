import React from 'react'
import { ChoiceGroup } from '../../ChoiceGroup'
import { useFormInput } from '../../../hooks'
import PropTypes from 'prop-types'

export const RadioGroup = props => {
  const { path, label, options, ariaLabel, required, className, initialSelectedKey, styles, id } = props

  const {
    value,
    error,
    onChange,
    errClass,
    componentRef
  } = useFormInput({
    path,
    extractor: (event, value) => value
  })

  return (
    <ChoiceGroup
      id={id}
      options={options}
      className={[className, errClass].join(' ')}
      ariaLabel={ariaLabel}
      label={label}
      required={required}
      onChange={onChange}
      selectedKey={value.key}
      initialSelectedKey={initialSelectedKey}
      styles={styles}
      error={error}
      componentRef={componentRef}
    />
  )
}

RadioGroup.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  initialSelectedKey: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
      disabled: PropTypes.bool
    })
  ),
  styles: PropTypes.object,
  className: PropTypes.string
}
