const path = require('path');

module.exports = {
  stories: ['../{components,modules}/**/*.stories.@(tsx|mdx)', './docs/**/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y'],
  webpackFinal: config => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        components: path.resolve(__dirname, '../components'),
      },
    },
  }),
};
