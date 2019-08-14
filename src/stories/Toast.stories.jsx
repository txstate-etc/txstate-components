import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, toast } from '../components'

storiesOf('Toast', module)
  .add('basic', () => {
    return (
      <Button
        variant='primary'
        ariaLabel='Primary'
        label='Show Toast'
        onClick={() =>
          toast.makeText({
            message: 'Example of a toast',
            gravity: toast.GRAVITY.TOP_CENTER,
            duration: 3000
          })
        }
      />
    )
  })
  .add('top right', () => {
    return (
      <Button
        variant='primary'
        ariaLabel='Primary'
        label='Show Toast - top right'
        onClick={() =>
          toast.makeText({
            message: 'I am at the top right',
            gravity: toast.GRAVITY.TOP_RIGHT,
            duration: 3000
          })
        }
      />
    )
  })
  .add('bottom center', () => {
    return <Button variant='primary' ariaLabel='Primary' label='Show Toast - bottom center' onClick={() =>
      toast.makeText({
        message: 'I am at the bottom',
        gravity: toast.GRAVITY.BOTTOM_CENTER,
        duration: 3000
      })} />
  })
