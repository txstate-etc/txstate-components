import React, { useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Stack, Button } from '../components'
import { TextInput, Dropdown } from '../components/Form/Inputs'
import styled from 'styled-components'

const FormInputs = styled(Stack)`
  width: 400px;
`

const FormExample = props => {
  const form = useRef()
  return (
    <Stack spacing={12}>
      <Form
        onChange={({ form, errors }) => console.log(form, errors)}
        ref={form}
        validate={async (form) => {
          const errors = {}
          if (form.icecream.key === 'sherbert') {
            errors.icecream = 'Get out of here with your sherbert'
          }
          if (form.name.first !== 'andrew') {
            errors.name = {
              first: 'Doesn\'t ring a bell'
            }
          }
          console.log(errors)
          return { errors }
        }}
        initialValues={{
          icecream: { key: 'butter pecan' }
        }}
      >
        <FormInputs>
          <TextInput label='First Name' path='name.first' />
          <TextInput label='Last Name' path='name.last' />
          <Dropdown
            label='Favorite Ice Cream'
            path='icecream'
            options={[
              { key: 'vanilla', text: 'Vanilla' },
              { key: 'strawberry', text: 'Strawberry' },
              { key: 'chocolate', text: 'Chocolate' },
              { key: 'butter pecan', text: 'Butter pecan' },
              { key: 'cookie dough', text: 'Cookie dough' },
              { key: 'mint', text: 'Mint' },
              { key: 'coffee', text: 'Coffee' },
              { key: 'sherbert', text: 'Sherbert' }
            ]}
          />
        </FormInputs>
      </Form>
      <Stack.Item>
        <Stack spacing={12} horizontal>
          <Button variant='outline' label='Cancel' ariaLabel='cancel form' />
          <Button label='Submit' ariaLabel='submit example form' onClick={() => form.current.submit()} />
        </Stack>
      </Stack.Item>
    </Stack>
  )
}

storiesOf('Form|Dev', module)
  .add('basic', () => {
    return <FormExample />
  })
