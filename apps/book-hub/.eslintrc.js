const config = require('config/eslint-preset')

module.exports = {
  ...config,
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  ignorePatterns: ['pages/api/nexus-typegen.ts', 'lib/generated/**/*'],
}
