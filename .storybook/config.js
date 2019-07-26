import { configure, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../src/React'
import React from 'react'

function loadStories() {
  require('../src/stories');
}

addDecorator(withA11y)

configure(loadStories, module);
