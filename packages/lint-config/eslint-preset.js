module.exports = {
  settings: {
    next: { rootDir: ['apps/*/', 'packages/*/'] },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['apps/*/tsconfig.json'],
      },
    },
  },
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'next',
    'turbo',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  rules: {
    'no-console': 2,
    '@next/next/no-html-link-for-pages': 0,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/prop-types': 0,
    'import/newline-after-import': 1,
    'import/order': [
      1,
      { pathGroups: [{ pattern: 'lib/**', group: 'external', position: 'after' }] },
    ],
    'turbo/no-undeclared-env-vars': 2,
  },
  ignorePatterns: ['**/*.json', 'node_modules', '.turbo', '.next'],
}
