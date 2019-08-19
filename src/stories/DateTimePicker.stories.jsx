import React, { useState } from 'react'
import { BaseDatePicker, Label, BaseTimePicker, BaseDateTimePicker, Stack } from '../components'
import { storiesOf } from '@storybook/react'
import dayjs from 'dayjs'

const BasicDate = props => {
  const [date, setDate] = useState(dayjs().startOf('day'))

  return (
    <Stack spacing={12}>
      <Stack.Item>
        <Label>Inline</Label>
        <BaseDatePicker value={date} onChange={setDate} variant='inline' />
      </Stack.Item>
      <Stack.Item>
        <Label>Static</Label>
        <BaseDatePicker value={date} onChange={setDate} variant='static' />
      </Stack.Item>
      <Stack.Item>
        <Label>Dialog</Label>
        <BaseDatePicker value={date} onChange={setDate} />
      </Stack.Item>
    </Stack>
  )
}

const BasicDateTime = props => {
  const [date, setDate] = useState(dayjs().startOf('day'))

  return (
    <Stack spacing={12}>
      <Stack.Item>
        <Label>Inline</Label>
        <BaseDateTimePicker value={date} onChange={setDate} variant='inline' />
      </Stack.Item>
      <Stack.Item>
        <Label>Static</Label>
        <BaseDateTimePicker value={date} onChange={setDate} variant='static' />
      </Stack.Item>
      <Stack.Item>
        <Label>Dialog</Label>
        <BaseDateTimePicker value={date} onChange={setDate} />
      </Stack.Item>
    </Stack>
  )
}

const BasicTime = props => {
  const [date, setDate] = useState(dayjs().startOf('day'))

  return (
    <Stack spacing={12}>
      <Stack.Item>
        <Label>Inline</Label>
        <BaseTimePicker value={date} onChange={setDate} variant='inline' />
      </Stack.Item>
      <Stack.Item>
        <Label>Static</Label>
        <BaseTimePicker value={date} onChange={setDate} variant='static' />
      </Stack.Item>
      <Stack.Item>
        <Label>Dialog</Label>
        <BaseTimePicker value={date} onChange={setDate} />
      </Stack.Item>
    </Stack>
  )
}

storiesOf('Picker/Date', module)
  .add('basic', () => {
    return <BasicDate />
  })

storiesOf('Picker/DateTime', module)
  .add('basic', () => {
    return <BasicDateTime />
  })

storiesOf('Picker/Time', module)
  .add('basic', () => {
    return <BasicTime />
  })
