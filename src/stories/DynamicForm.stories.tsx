import React from 'react'
import { DynamicSection, Input, Form, Button, Stack } from '../components'

// const NameControls: React.FunctionComponent<{ onAdd: () => void }> = ({ onAdd }) => {
//   const handleAdd = React.useCallback(() => {
//     onAdd()
//   }, [onAdd])

//   return <Button style={{ marginTop: 12 }} onClick={handleAdd} label='Add Section' />
// }

const NameSection: React.FunctionComponent<{ id: string }> = ({ id }) => {
  return (
    <Stack horizontal verticalAlign='end' spacing={6}>
      <Input
        label={'Name'}
        path={`${id}.name`}
        style={{ flex: 1 }}
      />
    </Stack>
  )
}
export const DynamicFormStory = () => {
  const [form, setForm] = React.useState<any>()

  return (
    <>
      <Form
        onChange={({ form }) => {
          setForm(form)
        }}
      >
        <DynamicSection
          path='names'
          Section={NameSection}
          addLabel='Add Section'
        />
      </Form>
      <div style={{ marginTop: 12 }}>{JSON.stringify(form, null, 2)}</div>
    </>
  )
}

DynamicFormStory.story = {
  name: 'predefined sections'
}

export default {
  title: 'Form/Dynamic',
  component: DynamicSection
}
