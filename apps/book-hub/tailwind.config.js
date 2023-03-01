/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light', 'halloween'],
    darkTheme: 'halloween',
  },
}
