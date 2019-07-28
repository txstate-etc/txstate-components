import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Link } from '../React'

storiesOf('Link', module).add('primary', () => (
  <Link
    href='http://www.txstate.edu'
    variant='primary'
    ariaLabel='Primary'
    label='Primary Link'
    onClick={action('click')}
  />
))
