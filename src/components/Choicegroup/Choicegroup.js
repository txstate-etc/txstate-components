import React, { useRef } from 'react'
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
    id
  } = props

  const _id = useRef(id || shortid.generate())

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <OfficeChoiceGroup
        styles={{ ...styles }}
        id={_id}
        role='radiogroup'
        ariaLabel={ariaLabel}
        ariaLabelledBy={_id}
        onChange={onChange}
        selectedKey={selectedKey}
        options={options}
        required={required}
      />
    </>
  )
}

ChoiceGroup.propTypes = {
  ariaLabel: PropTypes.string.isRequired
}
