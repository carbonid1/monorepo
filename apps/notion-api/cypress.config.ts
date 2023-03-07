import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
