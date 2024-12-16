import dayjs from 'dayjs'
import { EditorState, Modifier } from 'draft-js'
import get from 'lodash/get'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { Button, Checkbox, Form, Stack } from '../components'
import { DatePicker, Dropdown, RadioGroup, RichText, TextInput } from '../components/Form/Inputs'
import { TagPicker } from '../components/Form/TagPicker/TagPicker'
import { TagItem } from '../components/TagItem'

const MetaDataTagPicker = React.forwardRef((props, ref) => {
  const { ariaLabel, label, path, itemLimit, items, className, showSelectedItems, description } = props

  const onRenderItem = (props) => {
    if (props.key === 'chocolate') {
      return <TagItem {...props} styles={{ root: { selectors: { ':hover': { background: 'salmon' } }, background: 'hotpink' } }}>{props.key}</TagItem>
    } else return <TagItem {...props}>{props.key}</TagItem>
  }

  return (
    <TagPicker
      path={path}
      items={items}
      ariaLabel={ariaLabel}
      itemLimit={itemLimit}
      label={label}
      onRenderItem={onRenderItem}
      description={description}
    />
  )
})

const FormInputs = styled(Stack)`
  width: 800px;
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
  const [shouldMountFriendIcecream, setShouldMountFriendIcecream] = useState(true)
  const handleSubmit = useCallback(async ({ form, errors }) => {
    const res = await fetch({
      method: 'get',
      url: 'https://swapi.co/api/people/21'
    })
    
    const lastName = get(form, 'name.last')
    console.log(res.data.name)
    if (lastName !== get(res.data, 'name')) {
      errors.name = { last: 'Thats not big daddy Sheev' }
    }
    return { errors }
  })

  return (
    <Stack spacing={12}>
      <Form
        id='ross-shitty-life-form'
        initialValues={{
          icecream: [
            { key: 'vanilla', name: 'Vanilla', data: { section: 'expired' } }
          ],
          friend: {
            icecreamFlavor: 'brownie triple chocolate chunk'
          }
        }}
        onSubmit={handleSubmit}
        runValidateOnSubmit
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
          if (form.swallowType && form.swallowType.key === 'european') {
            errors.swallowType = 'European swallows can\'t carry coconuts!'
          }
          if (!form.agreement) {
            errors.agreement = 'We just want you to express yourself.'
          }
          return { errors, success }
        }}
      >
        <FormInputs spacing={12}>
          <StyledInput label='First Name' path='name.first' />
          <StyledInput label='Last Name' path='name.last' />
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
          <Dropdown path='test' label='test' options={[{ key: 'test', text: 'test' }]} className='test123' />
          <Checkbox path='agreement' label='I have at least 16 pieces of flair.' />
          <Stack horizontal horizontalAlign='space-between' spacing={12}>
            <div style={{ flex: 1 }}>
              <DatePicker label='Delivery Date' path='date.delivery' variant='inline' initialValue={null} minDateMessage='Too soon!' />
            </div>
            <div style={{ flex: 1 }}>
              <DatePicker label='Pickup Date' path='date.pickup' variant='inline' initialValue={dayjs('2017-01-24')} />
            </div>
          </Stack>
          {shouldMountFriendIcecream && <StyledInput label={'Friend\'s Icecream'} path='friend.icecreamFlavor' />}
          <Button onClick={() => setShouldMountFriendIcecream(prev => !prev)} label={'Toggle Friend\'s Icecream'} />
          <div>
            <StyledPicker
              label='Favorite Ice Cream'
              ariaLabel='Ice Cream'
              path='icecream'
              showSelectedItems={false}
              description='sometimes i like to describe things'
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
          </div>
          <StyledRichText
            path='email.html'
          />
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
        initialValues={{
          age: 32
        }}
        ref={form}
      >
        <StyledInput label='Name' path='name' />
        <StyledInput label='Age' path='age' />
        <Button type='submit' label='Submit' />
      </Form>
      <Button label='Update Name' onClick={() => form.current.updatePath('name', 'Andrew')} />
    </Stack>
  )
}

const IndexedErrorForm = () => {
  const form = useRef()
  const validate = useCallback((form) => {
    const errors = {}
    if (!form.one) errors.one = 'One is required'
    if (!form.two) errors.two = 'Two is required'
    if (!form.three) errors.three = 'Three is required'
    if (!form.four) errors.four = 'Four is required'
    if (!form.five) errors.five = 'Five is required'
    return { errors }
  }, [])
  return (
    <Stack spacing={12}>
      <Form
        validate={validate}
        onSubmit={({ form }) => {
          return validate(form)
        }}
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

const CustomRichText = styled(RichText)`
  &.editor {
    max-height: 400px;
  }
`

const Preview = styled.div`
  white-space: pre-wrap;
  overflow-wrap: break-word;
  width: 100%;
  font-family: 'sans-serif';
`

const Tokens = styled(Stack)``
const Token = styled.span`
  border: solid 1px #808080;
  border-radius: 4px;
  padding: 10px 14px;
  font-size: 12px;
  color: #363534;
  cursor: pointer;

  &:hover {
    background-color: #DADADA;
  }
`

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 6px;
`

const CustomOption = props => {
  const addStar = () => {
    const { onChange, editorState } = props

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '⭐',
      editorState.getCurrentInlineStyle()
    )
    onChange(EditorState.push(editorState, contentState, 'insert-characters'))
  }

  return (
    <OptionContainer onClick={addStar}>⭐</OptionContainer>
  )
}

const EmailTokenInsert = () => {
  const [html, setHtml] = useState('')
  const tokens = [
    { name: 'Overdue' },
    { name: 'Needs Review' },
    { name: 'Borked' },
    { name: 'F*$#@d' }
  ]
  return (
    <Form onChange={({ form }) => setHtml(form.email)}>
      <Stack spacing={16}>
        <Tokens horizontal wrap spacing={12}>
          {tokens.map(token => <Token>{token.name}</Token>)}
        </Tokens>
        <CustomRichText path='email' customOptions={[CustomOption]}/>
        <Preview dangerouslySetInnerHTML={{ __html: html }} />
      </Stack>
    </Form>
  )
}

export default {
  title: 'Components | Form',
  component: FormExample
}

export const FormStory = {
  name: 'Form',
  component: FormExample
}

// storiesOf('Form|Simple', module)
//   .add('basic', () => {
//     return <FormExample />
//   })
//   .add('path updates', () => {
//     return <PathUpdateForm />
//   })
//   .add('indexed error tracking', () => {
//     return <IndexedErrorForm />
//   })
//   .add('email token insertion', () => {
//     return <EmailTokenInsert />
//   })
