import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Stack, Button, Theme } from '../components'
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
        horizontalAlign='start'
        spacing={8}
        style={{ display: 'inline-block' }}
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
  .add('style override', () => {
    const GoldButton = styled(Button)`  
      &.button-container {
        background-color: ${Theme.gold};
      }
    
      & > .button-label {
        color: white;
      }
    `

    const GoldOutlineButton = styled(Button)`
      &.button-container {
        border-color: ${Theme.gold};

        :hover {
          box-shadow: inset 0 -2px 0 0 ${Theme.gold};
        }
      }

      & > .button-label {
        color: ${Theme.gold}
      }
    `

    const GoldChangeOnHover = styled(Button)`
      &.button-container { 
        background-color: ${Theme.gold};

        :hover {
          background-color: white;
          box-shadow: inset 0 -2px 0 0 ${Theme.gold};

          .button-label {
            color: ${Theme.gold};
          }
        }
      }

      &.button-label {
        color: ${Theme.white};
      }
    `

    return (
      <Stack spacing={16} horizontal>
        <GoldButton variant='primary' ariaLabel='Golden Button' label='Styled Primary' onClick={action('click')} />
        <GoldOutlineButton variant='outline' onClick={action('click')} ariaLabel='Golden Outlined Button' label='Styled Outline' />
        <GoldChangeOnHover variant='outline' onClick={action('click')} ariaLabel='Golden Outlined Button' label='Very Styled Primary' />
      </Stack>
    )
  })
