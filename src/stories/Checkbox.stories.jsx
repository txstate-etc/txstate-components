import React from 'react'
import { storiesOf } from '@storybook/react'
import { Checkbox } from '../components'

storiesOf('Checkbox', module)
  .add('basic', () => {
    return <Checkbox ariaLabel='Checkbox' label='Test' />
  })
