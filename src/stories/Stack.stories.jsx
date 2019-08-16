import React from 'react'
import { storiesOf } from '@storybook/react'
import { Stack, Theme } from '../components'
import styled from 'styled-components'

const Box = styled.div`
  min-width: 100px;
  min-height: 100px;
  background-color: ${Theme.maroon};
`

const SandstoneStack = styled(Stack)`
  background-color: ${Theme.sandstone};
  border: solid 2px #303030;
`

storiesOf('Stack/Horizontal', module)
  .add('basic', () => {
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

const VerticalSandstoneStack = styled(SandstoneStack)`
  height: 600px;
  width: fit-content;
`

storiesOf('Stack/Vertical', module)
  .add('basic', () => {
    return (
      <VerticalSandstoneStack
        renderAs='div'
        horizontalAlign='center'
        verticalAlign='space-evenly'
        wrap
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
