module.exports = {
  presets: ['next/babel', '@babel/preset-typescript', ['@babel/preset-env', { targets: { node: 'current' } }]],
  plugins: [['babel-plugin-styled-components', { ssr: true, displayName: true, preprocess: false }]],
};
