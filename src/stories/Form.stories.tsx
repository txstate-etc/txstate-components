import React, { useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { FormRef } from '../components/Form.types'
import { useFormInput } from '../hooks/useFormInput'
import nanoid from 'nanoid'
import { Button, Stack, Form } from '../components'

interface TextProps {
  path: string
  label: string
  id?: string
}

const TextInput = (props: TextProps) => {
  const { path, label, id = nanoid(10) } = props

  const {
    error,
    onChange,
    value
  } = useFormInput({
    path,
    extractor: (e: any) => e.target.value
  })

  return (
    <div>
      <label style={{ display: 'block' }}>{label}</label>
      <input id={id} value={value} onChange={onChange} type='text' />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  )
}

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

const FormExample = () => {
  const ref = useRef<FormRef>(null)
  const formSetup = {} as FormStructure

  return (
    <Form
      forwardRef={ref}
      setup={formSetup}
      initialValues={initialValues}
    >
      <Stack spacing={8}>
        <Stack.Item>
          <TextInput path='person.name.first' label='First Name' />
        </Stack.Item>
        <Stack.Item>
          <TextInput path='person.name.last' label='Last Name' />
        </Stack.Item>
        <Stack horizontal spacing={8}>
          <Button type='button' variant='outline' label='Cancel' />
          <Button type='submit' label='Submit' />
        </Stack>
      </Stack>
    </Form>
  )
}

storiesOf('Form|Simple', module)
  .add('basic', () => {
    return <FormExample />
  })
