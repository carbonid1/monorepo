const path = require('path');

module.exports = {
  stories: ['../{components,modules}/**/*.stories.@(tsx|mdx)', '../docs/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-postcss',
    '@storybook/addon-essentials',
  ],
  webpackFinal: config => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        components: path.resolve(__dirname, '../components'),
        consts: path.resolve(__dirname, '../consts'),
        mocks: path.resolve(__dirname, '../mocks'),
        services: path.resolve(__dirname, '../services'),
        utils: path.resolve(__dirname, '../utils'),
      },
    },
  }),
};
