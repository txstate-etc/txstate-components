import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Theme, Link } from '../React'
import styled from 'styled-components'

storiesOf('Link', module)
  .add('primary', () => <Link href="http://www.txstate.edu" variant='primary' ariaLabel='Primary' label='Primary Link' onClick={action('click')} />)
  