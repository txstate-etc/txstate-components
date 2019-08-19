import React, { useState } from 'react'
import { DatePicker, Label, TimePicker, DateTimePicker, Stack } from '../components'
import { storiesOf } from '@storybook/react'
import dayjs from 'dayjs'

const BasicDate = props => {
  const [date, setDate] = useState(dayjs().startOf('day'))

  React.useEffect(() => {
    console.log(date.format())
  }, [date])
  return (
    <Stack spacing={12}>
      <Stack.Item>
        <Label>Inline</Label>
        <DatePicker value={date} onChange={setDate} variant='inline' />
      </Stack.Item>
      <Stack.Item>
        <Label>Static</Label>
        <DatePicker value={date} onChange={setDate} variant='static' />
      </Stack.Item>
      <Stack.Item>
        <Label>Dialog</Label>
        <DatePicker value={date} onChange={setDate} />
      </Stack.Item>
    </Stack>
  )
}

const BasicDateTime = props => {
  const [date, setDate] = useState(dayjs().startOf('day'))

  React.useEffect(() => {
    console.log(date.format())
  }, [date])
  return (
    <Stack spacing={12}>
      <Stack.Item>
        <Label>Inline</Label>
        <DateTimePicker value={date} onChange={setDate} variant='inline' />
      </Stack.Item>
      <Stack.Item>
        <Label>Static</Label>
        <DateTimePicker value={date} onChange={setDate} variant='static' />
      </Stack.Item>
      <Stack.Item>
        <Label>Dialog</Label>
        <DateTimePicker value={date} onChange={setDate} />
      </Stack.Item>
    </Stack>
  )
}

const BasicTime = props => {
  const [date, setDate] = useState(dayjs().startOf('day'))

  React.useEffect(() => {
    console.log(date.format())
  }, [date])
  return (
    <Stack spacing={12}>
      <Stack.Item>
        <Label>Inline</Label>
        <TimePicker value={date} onChange={setDate} variant='inline' />
      </Stack.Item>
      <Stack.Item>
        <Label>Static</Label>
        <TimePicker value={date} onChange={setDate} variant='static' />
      </Stack.Item>
      <Stack.Item>
        <Label>Dialog</Label>
        <TimePicker value={date} onChange={setDate} />
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
