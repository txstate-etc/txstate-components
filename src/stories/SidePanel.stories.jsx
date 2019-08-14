import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '../components'

storiesOf('SidePanel', module)
  .add('basic', () => {
    return <Button label='Open Left' ariaLabel='Open Left Side Panel' />
  })
