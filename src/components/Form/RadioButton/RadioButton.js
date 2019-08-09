import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from '../Form'
import { useFormInput } from '../../../hooks'
import styled from 'styled-components'

const RadioButtonContainer = styled.div``

export const RadioButton = (props) => {
  const { id, label } = props
  const formEvent = useContext(FormContext)
  const [checked, setChecked] = useState(false)

  const {
    value,
    onChange
  } = useFormInput({
    path: formEvent,
    extractor: () => id
  })

  useEffect(() => {
    setChecked(value === id)
  }, [value, setChecked, id])

  return (
    <RadioButtonContainer>
      <label htmlFor={id} >{label}</label>
      <input type='radio' id={id} value={id} name={formEvent} checked={checked} onChange={onChange} />
    </RadioButtonContainer>
  )
}
