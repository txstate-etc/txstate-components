import { configure, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'

addDecorator(withA11y)
configure(require.context('../src/stories', true, /stories.[mtj][ds]x?/), module)
