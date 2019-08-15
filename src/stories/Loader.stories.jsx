import React from 'react'
import { storiesOf } from '@storybook/react'
import { Loader, Stack, Button } from '../components'
import styled from 'styled-components'

const ViewComponent = props => {
  const { data } = props

  return (
    <ul>
      {data && data.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  )
}

const RefetchView = props => {
  const { data, reload, reloading } = props
  return (
    <Stack spacing={16}>
      <ViewComponent data={data} />
      {reloading ? <span>RELOADING DATA ... </span> : null}
      <Button label='Reload' onClick={reload} ariaLabel='reload data' />
    </Stack>
  )
}

const ErrorView = styled.h1`
  color: #e8e3db;
  background-color: #501214;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 3px;
  font-family: 'Open Sans', sans-serif;
`

const ErrorComponent = props => {
  const { error, load } = props
  return (
    <Stack>
      <ErrorView className='blink'>{error.message}</ErrorView>
      <Button label='Try Again' ariaLabel='try again' onClick={load} />
    </Stack>
  )
}

const fakeAPI = (type) => async () => {
  return new Promise((resolve, reject) => {
    const possibleData = [
      'Item One',
      'Item Two',
      'Item Three',
      'Item Four',
      'Item Five',
      'Item Six',
      'Item Seven',
      'Item Eight'
    ]
    const total = Math.floor(Math.random() * possibleData.length)
    setTimeout(() => {
      type === 'resolve' ? resolve(possibleData.slice(0, total)) : reject(new Error('Request failed with status code 503'))
    }, 500)
  })
}

storiesOf('Loader', module)
  .add('async loading', () => {
    return (
      <Loader
        fetch={fakeAPI('resolve')}
        View={ViewComponent}
        ErrorView={ErrorComponent}
      />
    )
  })
  .add('async loading with error', () => {
    return (
      <Loader
        fetch={fakeAPI('reject')}
        View={ViewComponent}
        ErrorView={ErrorComponent}
      />
    )
  })
  .add('async loading with refetch', () => {
    return (
      <Loader
        fetch={fakeAPI('resolve')}
        View={RefetchView}
        ErrorView={ErrorView}
      />
    )
  })
