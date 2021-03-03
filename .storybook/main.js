const path = require('path');

module.exports = {
  stories: ['../components/**/*.stories.mdx', '../(components|modules)/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
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
