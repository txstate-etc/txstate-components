import { configure, addDecorator, addParameters } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { withConsole } from '@storybook/addon-console'
import { setConsoleOptions } from '@storybook/addon-console'

function loadStories () {
  require('../src/stories')
}

const panelExclude = setConsoleOptions({}).panelExclude
setConsoleOptions({
  panelExclude: [...panelExclude, /[Warning]/]
})

addDecorator(withA11y)
addDecorator((storyFn, context) => withConsole()(storyFn)(context))

addParameters({
  options: { panelPosition: 'right' }
})

configure(loadStories, module)
