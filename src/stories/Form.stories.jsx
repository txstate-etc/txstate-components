import React, { useRef, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Stack, Button } from '../components'
import { TextInput, TagPicker, RichText } from '../components/Form/Inputs'
import { useEvent } from '../hooks'
import styled from 'styled-components'
import get from 'lodash.get'

const FormInputs = styled(Stack)`
  width: 400px;
  height: 800px;
  display: flex;
  flex-direction: column;
`

const StyledInput = styled(TextInput)`
  width: 100%;
`

const StyledPicker = styled(TagPicker)`
  width: 100%;
`

const StyledRichText = styled(RichText)`
  flex: 1;
`

const FormExample = props => {
  const form = useRef()
  const [selectedItems, setSelectedItems] = useState([{ key: 'vanilla', name: 'Vanilla' }])
  const updateInitialState = useEvent('ross-shitty-life-form-form-ready')
  
  const updatedSelectedItems = () => {
    updateInitialState({
        icecream: [
          { key: 'vanilla', name: 'Vanilla' },
          { key: 'strawberry', name: 'Strawberry' }
        ]
    })
  }

  return (
    <Stack spacing={12}>
      <Form
        id='ross-shitty-life-form'
        onChange={({ form, errors }) => console.log(form, errors)}
        ref={form}
        initialValues={{
          icecream: [
            { key: 'vanilla', name: 'Vanilla' }
          ]
        }}
        validate={async (form) => {
          const errors = {}
          if (get(form, 'name.first') !== 'phillip') {
            errors.name = {
              first: 'Doesn\'t ring a bell'
            }
          }
          return { errors }
        }}
      >
        <FormInputs>
          <StyledInput label='First Name' path='name.first' />
          <StyledInput label='Last Name' path='name.last' />
          <StyledPicker
            label='Favorite Ice Cream'
            ariaLabel='Ice Cream'
            path='icecream'
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
          <StyledRichText
            path='email.html'
          />
          <Button label='Add another' ariaLabel='add another item' onClick={updatedSelectedItems} />
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

storiesOf('Form|Simple', module)
  .add('basic', () => {
    return <FormExample />
  })
