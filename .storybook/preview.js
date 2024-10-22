// import { configure, addDecorator, addParameters } from '@storybook/react'
// import { withA11y } from '@storybook/addon-a11y'
// import { withConsole, setConsoleOptions } from '@storybook/addon-console'

// const panelExclude = setConsoleOptions({}).panelExclude
// setConsoleOptions({
//   panelExclude: [...panelExclude, /[Warning]/]
// })

// addDecorator(withA11y)
// addDecorator((storyFn, context) => withConsole()(storyFn)(context))

// addParameters({
//   options: { panelPosition: 'right' }
// })

// configure(require.context('../src/stories', true, /\.stories\.(js|jsx|ts|tsx|mdx)$/), module)

export default {
  tags: ["autodocs"],
};
