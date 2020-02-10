import React, { useEffect, useRef } from 'react'
import { useFormInput } from '../../../hooks'
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox'
import PropTypes from 'prop-types'

import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
initializeIcons()

export const Dropdown = React.forwardRef((props, ref) => {
  const { label, className, options, path, initialSelectedKey, disabled, styles } = props

  const {
    value,
    error,
    onChange,
    errClass,
    focus
  } = useFormInput({
    path,
    initialValue: options.find(({ key }) => key === initialSelectedKey)
  })

  const componentRef = useRef()

  useEffect(() => { focus && componentRef.current.focus() }, [focus])
  return (
    <ComboBox
      ref={ref}
      styles={styles}
      className={[className, errClass].join(' ')}
      disabled={disabled}
      selectedKey={value.key}
      onChange={onChange}
      autoComplete='on'
      label={label}
      options={options}
      errorMessage={error}
      useComboBoxAsMenuWidth
      focus={focus}
      componentRef={componentRef}
    />
  )
})

Dropdown.defaultProps = {
  options: []
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  initialSelectedKey: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string
  })),
  styles: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool
}
