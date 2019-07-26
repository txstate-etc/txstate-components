import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Stack, Button, Theme } from '../React'
import styled from 'styled-components'

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${Theme.maroon};
`

const SandstoneStack = styled(Stack)`
  background-color: ${Theme.sandstone};
  border: solid 2px #303030;
`

storiesOf('Stack/Horizontal', module)
  .add('start aligned', () => {
    return (
      <SandstoneStack
        horizontal
        renderAs='div'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </SandstoneStack>
    )
  })
  .add('center aligned', () => {
    return (
      <SandstoneStack
        horizontal
        horizontalAlign='center'
        renderAs='div'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </SandstoneStack>
    )
  })
  .add('end aligned', () => {
    return (
      <SandstoneStack
        horizontal
        horizontalAlign='end'
        renderAs='div'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </SandstoneStack>
    )
  })
  .add('evenly aligned', () => {
    return (
      <SandstoneStack
        horizontal
        horizontalAlign='even'
        renderAs='div'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </SandstoneStack>
    )
  })
  .add('spaced around', () => {
    return (
      <SandstoneStack
        horizontal
        horizontalAlign='around'
        renderAs='div'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </SandstoneStack>
    )
  })
  .add('spaced between', () => {
    return (
      <SandstoneStack
        horizontal
        horizontalAlign='between'
        renderAs='div'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </SandstoneStack>
    )
  })
  .add('evenly with buttons', () => {
    return (
      <SandstoneStack
        horizontal
        horizontalAlign='even'
        renderAs='div'
        spacing={4}
      >
        <Button label='SUPER START' onClick={action('click')} />
        <Button label='START' variant='outline' onClick={action('click')} />
        <Button label='CENTER' onClick={action('click')} />
        <Button label='END' variant='outline' onClick={action('click')} />
        <Button label='VERY END' onClick={action('click')} />
      </SandstoneStack>
    )
  })

const VerticalSandstoneStack = styled(SandstoneStack)`
  height: 800px;
`

storiesOf('Stack/Vertical', module)
  .add('start aligned', () => {
    return (
      <VerticalSandstoneStack
        renderAs='div'
        horizontalAlign='center'
        verticalAlign='start'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </VerticalSandstoneStack>
    )
  })
  .add('center aligned', () => {
    return (
      <VerticalSandstoneStack
        horizontalAlign='center'
        verticalAlign='center'
        renderAs='div'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </VerticalSandstoneStack>
    )
  })
  .add('end aligned', () => {
    return (
      <VerticalSandstoneStack
        horizontalAlign='center'
        verticalAlign='end'
        renderAs='div'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </VerticalSandstoneStack>
    )
  })
  .add('evenly aligned', () => {
    return (
      <VerticalSandstoneStack
        horizontalAlign='center'
        verticalAlign='even'
        renderAs='div'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </VerticalSandstoneStack>
    )
  })
  .add('spaced around', () => {
    return (
      <VerticalSandstoneStack
        horizontalAlign='center'
        verticalAlign='around'
        renderAs='div'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </VerticalSandstoneStack>
    )
  })
  .add('spaced between', () => {
    return (
      <VerticalSandstoneStack
        horizontalAlign='center'
        verticalAlign='between'
        renderAs='div'
        spacing={4}
      >
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </VerticalSandstoneStack>
    )
  })
  .add('evenly with buttons', () => {
    return (
      <VerticalSandstoneStack
        horizontalAlign='center'
        verticalAlign='even'
        renderAs='div'
        spacing={4}
      >
        <Button label='SUPER START' onClick={action('click')} />
        <Button label='START' variant='outline' onClick={action('click')} />
        <Button label='CENTER' onClick={action('click')} />
        <Button label='END' variant='outline' onClick={action('click')} />
        <Button label='VERY END' onClick={action('click')} />
      </VerticalSandstoneStack>
    )
  })
