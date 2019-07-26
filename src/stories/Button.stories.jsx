import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Stack, Button, Theme } from '../React'
import styled from 'styled-components'

const Container = styled(Stack)`
  background-color: ${Theme.sandstone};
  border: solid 1px;
`

storiesOf('Button', module)
  .add('primary', () => <Button variant='primary' ariaLabel='Primary' label='Primary Button' onClick={action('click')} />)
  .add('outline', () => <Button variant='outline' ariaLabel='Outline' label='Outline Button' onClick={action('click')} />)
  .add('transparent', () => {
    return (
      <Container
        horizontal
        horizontalAlign='center'
        spacing={8}
      >
        <Button
          label='Transparent'
          ariaLabel='Transparent'
          variant='transparent'
          onClick={action('click')}
        />
      </Container>
    )
  })
