const resolve = require('path').resolve

module.exports = [
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
]
