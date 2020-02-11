import React, { useRef, useEffect } from 'react'
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
    focus
  } = useFormInput({
    path,
    extractor: (event, value) => value
  })

  const ref = useRef()
  useEffect(() => { focus && ref.current.focus() }, [focus])

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
      componentRef={ref}
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
