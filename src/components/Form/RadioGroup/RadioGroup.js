import React from 'react'
import { useFormInput } from '../../../hooks'
import { Stack } from '../../Stack'
import { Form } from '../Form'
import styled from 'styled-components'

const Label = styled.span``

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
      <Label>{label}</Label>
      <Stack {...stackProps}>
        {children}
      </Stack>
    </Form>
  )
}
