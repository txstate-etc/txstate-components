import React from 'react'
import { useFormInput } from '../../../hooks'
import { Stack } from '../../Stack'
import { Form } from '../Form'
import styled from 'styled-components'

const Label = styled.legend``

const FieldSet = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`

// TODO: Use ChoiceGroup instead of this manual stuff
export const RadioGroup = props => {
  const { children, label, stackProps, path, id } = props

  const {
    onChange
  } = useFormInput({
    path,
    extractor: ({ form }) => form[id]
  })

  return (
    <Form
      id={id}
      onChange={onChange}
    >
      <Stack {...stackProps}>
        <FieldSet role='group' >
          <Label>{label}</Label>
          {children}
        </FieldSet>
      </Stack>
    </Form>
  )
}
