import React from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Stack, TextInput } from '../components'

const validate = form => console.log(form)

storiesOf('Form', module)
  .add('basic', () => {
    return (
      <Form
        validate={validate}
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
          <TextInput name='age' label='Age: ' onGetErrorMessage={(e, value) => {
            if (value > 32) return 'Too Old'
          }} />
        </Stack>
      </Form>
    )
  })
