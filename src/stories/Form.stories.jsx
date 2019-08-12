import React from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Stack, Switch, Button, RadioGroup, Dropdown, RadioButton, TextInput, Checkbox } from '../components'

storiesOf('Form', module)
  .add('basic', () => {
    let form = null

    const onSubmit = ({ form, errors }) => {
      console.log('Form: ', form)
      console.log('Errors: ', errors)
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
          <Stack spacing={16} style={{ margin: -16 }} >
            <Checkbox
              label='Option 1'
              name='optionOne'
            />
            <Checkbox
              label='Option 2'
              name='optionTwo'
            />
            <Checkbox
              name='optionThree'
              label='Option 3'
            />
          </Stack>
          <RadioGroup
            path='alphabet'
            id='alphabet'
            label='Select an option'
          >
            <RadioButton id='alpha' label='Alpha' />
            <RadioButton id='bravo' label='Bravo' />
            <RadioButton id='charlie' label='Charlie' />
            <RadioButton id='delta' label='Delta' />
          </RadioGroup>
          <Dropdown
            initialSelectedKey='cof'
            label='Pick your favorite ice cream:'
            options={[
              { key: 'choco', text: 'Chocolate' },
              { key: 'van', text: 'Vanilla' },
              { key: 'straw', text: 'Strawberry' },
              { key: 'lemon', text: 'Lemon' },
              { key: 'cheese', text: 'Cheesecake' },
              { key: 'cof', text: 'Coffee' },
              { key: 'pecan', text: 'Pecan' }
            ]}
            path='icecream'
          />
          <Button variant='primary' ariaLabel='Submit Form' label='Submit' onClick={() => {
            form.submit && form.submit()
          }} />
        </Stack>
      </Form>
    )
  })
