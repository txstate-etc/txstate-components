const resolve = require('path').resolve

module.exports = {
  presets: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: resolve(__dirname, '../tsconfig.json')
        },
        tsDocgenLoaderOptions: {
          tsconfigPath: resolve(__dirname, '../tsconfig.json')
        },
        include: [resolve(__dirname, '../src')]
      }
    },
    '@storybook/addon-docs/react/preset'
  ],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-docs/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          include: [resolve(__dirname, '../src')]
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false }
        },
      }
    }
  ]
}
