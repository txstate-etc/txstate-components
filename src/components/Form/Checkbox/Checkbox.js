import React, { useRef } from 'react'
import { useFormInput } from '../../../hooks'
import styled from 'styled-components'
import uuid from 'uuid/v4'

const Label = styled.label`
  user-select: none;
`
const ChecboxInput = styled.input.attrs(() => ({ type: 'checkbox' }))``
const Clickable = styled.div``

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

  return (
    <Clickable>
      <Label htmlFor={_id.current}>{label}</Label>
      <ChecboxInput id={_id.current} aria-label={ariaLabel} name={name} checked={value} onChange={onChange} />
    </Clickable>
  )
}
