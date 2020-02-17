import React, { useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { Form, FormRef } from '../components/Form'
import { useFormInput } from '../hooks/useFormInput'
import shortid from 'shortid'

interface TextProps {
  path: string
  label: string
  id?: string
}

const TextInput = (props: TextProps) => {
  const { path, label, id = shortid.generate() } = props

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
      first: 'Andrew',
      last: 'James',
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
      onSubmit={async ({ form, errors }) => {
        console.log(form.person.name.first)
        console.log(form.age)
        console.log(errors.person?.name?.last)
      }}
    >
      <TextInput path='name.first' label='First Name' />
      <TextInput path='name.last' label='Last Name' />
    </Form>
  )
}

storiesOf('Form|Simple', module)
  .add('basic', () => {
    return <FormExample />
  })
