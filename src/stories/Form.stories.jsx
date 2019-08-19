import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Form,
  Stack,
  Button,
  Label
} from '../components'

import {
  Toggle,
  DynamicSection,
  RadioGroup,
  Dropdown,
  TextInput,
  RichText,
  DatePicker,
  TimePicker,
  DateTimePicker,
  TextArea,
  Checkbox
} from '../components/Form/Inputs'

storiesOf('Form', module)
  .add('basic', () => {
    let form = null

    const onSubmit = ({ form, errors }) => {
      console.log(`Form: `, form)
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
          <Stack.Item>
            <TextInput
              name='name'
              path='name'
              label='Name: '
              onGetErrorMessage={async (e, value) => {
                await new Promise(resolve => setTimeout(() => resolve(), 500))
                if (value.length <= 0) return 'Enter your name in the text box.'
                if (value.length >= 5) return 'Your name must be less than 5 characters.'
              }}
            />
            <TextInput
              name='age'
              path='age'
              label='Age: '
              onGetErrorMessage={(e, value) => {
                if (value > 32) return 'Too Old'
              }}
            />
          </Stack.Item>
          <Stack.Item>
            <Label>Birthday</Label>
            <DatePicker
              variant='inline'
              emptyLabel='select your birthday'
              initialValue={null}
              path='birthday'
            />
          </Stack.Item>
          <Stack.Item>
            <Label>Party</Label>
            <DateTimePicker
              variant='inline'
              emptyLabel='select party time'
              initialValue={null}
              path='party'
            />
          </Stack.Item>
          <Stack.Item>
            <Label>Ending Time</Label>
            <TimePicker
              variant='inline'
              emptyLabel='select party end time'
              initialValue={null}
              path='partyend'
            />
          </Stack.Item>
          <TextArea
            name='Description'
            path='description'
            label='Description:'
          />
          <Stack spacing={16} >
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
          <Stack.Item>
            <RadioGroup
              path='alphabet'
              id='alphabet'
              label='Select an option'
              options={[
                { key: 'alpha', text: 'Alpha' },
                { key: 'bravo', text: 'Bravo' },
                { key: 'charlie', text: 'Charlie' },
                { key: 'delta', text: 'Delta' }
              ]}
            />
          </Stack.Item>
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
          <Toggle size='small' label='Sprinkles' path='sprinkles' />
          <Toggle size='small' label='Caramel' path='caramel' />
          <Toggle size='small' label='Hot Fudge' path='fudge' />
          <RichText
            path='richtext'
          />
          <Button variant='primary' ariaLabel='Submit Form' label='Submit' onClick={() => {
            form.submit && form.submit()
          }} />
        </Stack>
      </Form>
    )
  })
  .add('dynamic', () => {
    let form = {}

    const Section = props => {
      const { handleDelete, id } = props
      return (
        <>
          <div onClick={() => handleDelete(id)} style={{ userSelect: 'none', cursor: 'pointer', position: 'relative' }}>
            <span>Delete</span>
          </div>
          <Stack style={{ marginBottom: 12, border: 'solid black 1px', padding: 12 }}>
            <TextInput
              label='First Name'
              path={`${id}.name.first`}
              name='firstname'
              onGetErrorMessage={(e, value) => {
                if (value.length <= 0) return 'Enter your name in the text box.'
                if (value.length >= 5) return 'Your name must be less than 5 characters.'
              }}
            />
            <TextInput label='Last Name' path={`${id}.name.last`} name='lastname' />
          </Stack>
        </>
      )
    }

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
          <DynamicSection
            path='friends'
            Section={Section}
            addLabel='Add Friend'
          />
          <Button label='Submit Friends' onClick={() => form.submit()} ariaLabel='Submit form' />
        </Stack>
      </Form>
    )
  })
