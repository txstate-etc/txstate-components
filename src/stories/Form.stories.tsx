import React, { useRef } from 'react'
import { FormRef } from '../components/Form/Form.types'
import { Button, Stack, Form, Input } from '../components'

const initialValues = {
  person: {
    name: {
      first: 'Phillip',
      middle: 'J',
      last: 'Fry',
      hair: 'Blue'
    }
  },
  age: 32
}

interface FormStructure {
  person: {
    name: {
      first: string,
      last: string
    }
  },
  age: number
}

export const SimpleForm = () => {
  const ref = useRef<FormRef>(null)
  const formSetup = {} as FormStructure

  return (
    <Form
      forwardRef={ref}
      setup={formSetup}
      onSubmit={({ form, errors }) => {
        console.log(form)
      }}
      onValidate={(form) => {
        if (form?.person?.name?.first === 'Phillip') {
          return {
            errors: {
              person: {
                name: {
                  first: 'Who is this?'
                }
              }
            }
          }
        } else {
          return {
            errors: {}
          }
        }
      }}
      initialValues={initialValues}
    >
      <Stack style={{ width: 400 }} spacing={12}>
        <Input path='person.name.first' label='First Name' />
        <Input path='person.name.last' label='Last Name' />
        <Stack horizontal spacing={8}>
          <Button type='button' variant='outline' label='Cancel' size='sm' />
          <Button type='submit' label='Submit' size='sm' />
        </Stack>
      </Stack>
    </Form>
  )
}

SimpleForm.story = {
  name: 'text inputs'
}

export default {
  title: 'Form/Simple',
  component: Form
}
