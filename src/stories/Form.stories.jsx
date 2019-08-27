import React, { useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Stack, Button } from '../components'
import { TextInput, TagPicker } from '../components/Form/Inputs'
import styled from 'styled-components'
import get from 'lodash.get'

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
          if (get(form, 'icecream.key') === 'sherbert') {
            errors.icecream = 'Get out of here with your sherbert'
          }
          if (get(form, 'name.first') !== 'andrew') {
            errors.name = {
              first: 'Doesn\'t ring a bell'
            }
          }
          return { errors }
        }}
      >
        <FormInputs>
          <TextInput label='First Name' path='name.first' />
          <TextInput label='Last Name' path='name.last' />
          <TagPicker
            label='Favorite Ice Cream'
            ariaLabel='Ice Cream'
            path='icecream'
            itemLimit={2}
            items={[
              { key: 'vanilla', name: 'Vanilla' },
              { key: 'strawberry', name: 'Strawberry' },
              { key: 'chocolate', name: 'Chocolate' },
              { key: 'butter pecan', name: 'Butter pecan' },
              { key: 'cookie dough', name: 'Cookie dough' },
              { key: 'mint', name: 'Mint' },
              { key: 'coffee', name: 'Coffee' },
              { key: 'sherbert', name: 'Sherbert' }
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
