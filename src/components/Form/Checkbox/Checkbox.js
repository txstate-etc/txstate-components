import React, { useRef } from 'react'
import { useFormInput } from '../../../hooks'
import { Checkbox as OfficeCheckbox } from 'office-ui-fabric-react/lib/Checkbox'
import shortid from 'shortid'
import PropTypes from 'prop-types'

export const Checkbox = props => {
  const { path, label, name, ariaLabel } = props
  const _id = useRef(shortid.generate())

  const {
    value,
    onChange
  } = useFormInput({
    path,
    extractor: e => e.target.checked
  })

  return <OfficeCheckbox id={_id.current} label={label} ariaLabel={ariaLabel} name={name} checked={value} onChange={onChange} />
}

Checkbox.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  name: PropTypes.string
}
