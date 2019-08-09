import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Switch, Stack } from '../components'
import styled from 'styled-components'

const FullStack = styled(Stack)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
`

const CenterStack = props => {
  return (
    <FullStack horizontalAlign='center' verticalAlign='center'>
      {props.children}
    </FullStack>
  )
}

storiesOf('Switch', module)
  .add('small', () => (
    <CenterStack>
      <Switch
        label='Small Switch'
        size='small'
        onValueChange={(on) => console.log(`Small switch is: ${on ? 'on' : 'off'}`)}
      />
    </CenterStack>
  ))
  .add('large', () => (
    <CenterStack>
      <Switch
        size='large'
        onValueChange={(on) => console.log(`Large switch is: ${on ? 'on' : 'off'}`)}
        label='Large Switch'
      />
    </CenterStack>
  ))
  .add('disabled', () => {
    return (
      <CenterStack>
        <Switch disabled onClick={action('click')} />
      </CenterStack>
    )
  })
