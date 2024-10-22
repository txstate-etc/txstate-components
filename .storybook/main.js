const config = {
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },
  // addons: ['@chromatic-com/storybook'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  docs: {},
  stories: ['../src/stories/*.mdx', '../src/stories/*.stories.@(js|jsx|mjs|ts|tsx)']
}
 
export default config
