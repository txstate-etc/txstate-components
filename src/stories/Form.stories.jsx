import React from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Stack, Button, TextInput } from '../components'

storiesOf('Form', module)
  .add('basic', () => {
    let form = null

    const onSubmit = ({ form, errors }) => {
      console.log(form)
      console.log(errors)
    }

    return (
      <Form
        ref={component => {
          form = component
        }}
        onSubmit={onSubmit}
      >
        <Stack spacing={16}>
          <TextInput
            name='name'
            label='Name: '
            onGetErrorMessage={(e, value) => {
              if (value.length <= 0) return 'Enter your name in the text box.'
              if (value.length >= 5) return 'Your name must be less than 5 characters.'
            }}
          />
          <TextInput
            name='age'
            label='Age: '
            onGetErrorMessage={(e, value) => {
              if (value > 32) return 'Too Old'
            }}
          />
          <Button variant='primary' ariaLabel='Submit Form' label='Submit' onClick={() => {
            form.submit && form.submit()
          }} />
        </Stack>
      </Form>
    )
  })
