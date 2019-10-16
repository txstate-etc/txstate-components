import React, { useRef, useImperativeHandle } from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Stack, Button, BasePicker } from '../components'
import { TextInput, RichText, Dropdown } from '../components/Form/Inputs'
import { useFormInput } from '../hooks'
import styled from 'styled-components'
import { get } from 'lodash'

const MetaDataTagPicker = React.forwardRef((props, ref) => {
  const { ariaLabel, label, path, itemLimit, items, className } = props

  const {
    value,
    onChange
  } = useFormInput({
    path,
    initialValue: [],
    extractor: e => e
  })

  useImperativeHandle(ref, () => ({
    onChange
  }))

  return (
    <BasePicker
      className={className}
      value={value}
      onChange={onChange}
      items={items}
      ariaLabel={ariaLabel}
      itemLimit={itemLimit}
      label={label}
    />
  )
})

const FormInputs = styled(Stack)`
  width: 400px;
  height: 800px;
  display: flex;
  flex-direction: column;
`

const StyledInput = styled(TextInput)`
  width: 100%;
`

const StyledPicker = styled(MetaDataTagPicker)`
  width: 100%;
`

const StyledRichText = styled(RichText)`
  flex: 1;
`

const FormExample = props => {
  const form = useRef()
  const icecreamPicker = useRef()

  const updatedSelectedItems = () => {
    icecreamPicker.current.onChange([
      { key: 'vanilla', name: 'Vanilla', data: { section: 'white' } },
      { key: 'strawberry', name: 'Strawberry', data: { section: 'red' } }
    ])
  }

  return (
    <Stack spacing={12}>
      <Form
        id='ross-shitty-life-form'
        onChange={({ form, errors }) => console.log(form, errors)}
        initialValues={{
          icecream: [
            { key: 'vanilla', name: 'Vanilla', data: { section: 'expired' } }
          ]
        }}
        onSubmit={({ form, errors }) => console.log('FORM: ', form)}
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
          <Dropdown styles={{ container: { display: 'none' }}} label='Temperature' path='temperature' options={[ { key: 'hot', text: 'Hot' }, { key: 'cold', text: 'Cold' }]} />
          <StyledPicker
            ref={icecreamPicker}
            label='Favorite Ice Cream'
            ariaLabel='Ice Cream'
            path='icecream'
            items={[
              { key: 'vanilla', name: 'Vanilla', data: { section: 'yogurt' } },
              { key: 'strawberry', name: 'Strawberry', data: { section: 'yogurt' } },
              { key: 'chocolate', name: 'Chocolate', data: { section: 'yogurt' } },
              { key: 'butter pecan', name: 'Butter pecan', data: { section: 'yogurt' } },
              { key: 'cookie dough', name: 'Cookie dough', data: { section: 'yogurt' } },
              { key: 'mint', name: 'Mint', data: { section: 'yogurt' } },
              { key: 'coffee', name: 'Coffee', data: { section: 'yogurt' } },
              { key: 'sherbert', name: 'Sherbert', data: { section: 'yogurt' } }
            ]}
          />
          <StyledRichText
            path='email.html'
          />
          <Button label='Add another' ariaLabel='add another item' onClick={updatedSelectedItems} />
        </FormInputs>
        <Stack.Item>
          <Stack spacing={12} horizontal>
            <Button variant='outline' label='Cancel' ariaLabel='cancel form' />
            <Button label='Submit' ariaLabel='submit example form' onClick={() => form.current.submit()} />
          </Stack>
      </Stack.Item>
      </Form>
    </Stack>
  )
}

storiesOf('Form|Simple', module)
  .add('basic', () => {
    return <FormExample />
  })
