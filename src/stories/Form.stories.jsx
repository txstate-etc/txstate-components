import React, { useRef, useImperativeHandle } from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Stack, Button, BasePicker } from '../components'
import { TextInput, RichText, Dropdown, RadioGroup } from '../components/Form/Inputs'
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
        onChange={({ form, errors, success }) => console.log(form, errors, success)}
        initialValues={{
          icecream: [
            { key: 'vanilla', name: 'Vanilla', data: { section: 'expired' } }
          ]
        }}
        onSubmit={({ form, errors }) => {
          console.log('FORM: ', form)
          const lastName = get(form, 'name.last')
          if (lastName) {
            return {
              success: {
                name: {
                  last: 'This is a great last name!'
                }
              }
            }
          }
        }}
        validate={async (form) => {
          const errors = {}
          const success = {}
          const name = get(form, 'name.first')
          if (name !== 'phillip') {
            errors.name = {
              first: 'Doesn\'t ring a bell'
            }
          } else if (name === 'phillip') {
            success.name = {
              first: 'Great Job, phillip!'
            }
          }
          return { errors, success }
        }}
      >
        <FormInputs>
          <StyledInput label='First Name' path='name.first' />
          <StyledInput label='Last Name' path='name.last' />
          <Dropdown styles={{ container: { display: 'none' } }} label='Temperature' path='temperature' options={[{ key: 'hot', text: 'Hot' }, { key: 'cold', text: 'Cold' }]} />
          <RadioGroup
            path='swallowType'
            label='Swallow Type'
            ariaLabel='choose the type of swallow to test'
            initialSelectedKey='african'
            options={[
              { key: 'african', text: 'African' },
              { key: 'european', text: 'European' }
            ]}
          />
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
            <Button label='Submit' ariaLabel='submit example form' type='submit' />
          </Stack>
        </Stack.Item>
      </Form>
    </Stack>
  )
}

const PathUpdateForm = () => {
  const form = useRef()
  return (
    <Stack spacing={12}>
      <Form
        onChange={({ form }) => console.log(form.name)}
        onSubmit={({ form }) => console.log(form)}
        ref={form}
      >
        <StyledInput label='Name' path='name' />
        <Button type='submit' label='Submit' />
      </Form>
      <Button label='Update Name' onClick={() => form.current.updatePath('name', 'Andrew')} />
    </Stack>
  )
}

const IndexedErrorForm = () => {
  const form = useRef()
  return (
    <Stack spacing={12}>
      <Form
        validate={(form) => {
          const errors = {}
          if (!form.one) errors['one'] = 'One is required'
          if (!form.two) errors['two'] = 'Two is required'
          if (!form.three) errors['three'] = 'Three is required'
          if (!form.four) errors['four'] = 'Four is required'
          if (!form.five) errors['five'] = 'Five is required'
          return { errors }
        }}
        onSubmit={({ form }) => console.log(form)}
        ref={form}
      >
        <Stack
          style={{ width: 500 }}
          spacing={12}
        >
          <StyledInput label='One' path='one' />
          <StyledInput label='Two' path='two' />
          <StyledInput label='Three' path='three' />
          <StyledInput label='Four' path='four' />
          <StyledInput label='Five' path='five' />
          <Button type='submit' label='Submit' />
        </Stack>
      </Form>
    </Stack>
  )
}



storiesOf('Form|Simple', module)
  .add('basic', () => {
    return <FormExample />
  })
  .add('path updates', () => {
    return <PathUpdateForm />
  })
  .add('indexed error tracking', () => {
    return <IndexedErrorForm />
  })
