import React, { useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ChoiceGroup as OfficeChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup'
import { Label } from 'office-ui-fabric-react/lib/Label'
import shortid from 'shortid'

export const ChoiceGroup = props => {
  const {
    label,
    options,
    ariaLabel,
    required,
    onChange,
    selectedKey,
    styles,
    initialSelectedKey,
    error,
    id
  } = props

  const _id = useRef(id || shortid.generate())
  const errorStyle = useMemo(() => {
    if (styles && styles.errorMessage) {
      return styles.errorMessage
    }
    return { color: 'red' }
  }, [styles])

  return (
    <>
      <Label htmlFor={_id.current}>{label}</Label>
      <OfficeChoiceGroup
        styles={{ ...styles }}
        id={_id.current}
        role='radiogroup'
        ariaLabel={ariaLabel || label}
        ariaLabelledBy={_id.current}
        onChange={onChange}
        selectedKey={selectedKey}
        options={options}
        required={required}
        defaultSelectedKey={initialSelectedKey}
      />
      {error && <span style={errorStyle}>{error}</span>}
    </>
  )
}

ChoiceGroup.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  })),
  required: PropTypes.bool,
  onChange: PropTypes.func,
  selectedKey: PropTypes.string,
  styles: PropTypes.object,
  initialSelectedKey: PropTypes.string,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  error: PropTypes.string
}
