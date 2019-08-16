import React, { useRef } from 'react'
import { useFormInput } from '../../../hooks'
import { Checkbox as OfficeCheckbox } from 'office-ui-fabric-react/lib/Checkbox'
import uuid from 'uuid/v4'

export const Checkbox = props => {
  const { name, label, ariaLabel } = props
  const _id = useRef(uuid())

  const {
    value,
    onChange
  } = useFormInput({
    path: name,
    extractor: e => e.target.checked
  })

  return <OfficeCheckbox id={_id.current} label={label} aria-label={ariaLabel} name={name} checked={value} onChange={onChange} />
}
