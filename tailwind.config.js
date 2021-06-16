const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./{pages,components,modules,docs}/**/*.{js,ts,jsx,tsx,mdx}'], // list all the folders
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      white: 'white',
      current: 'currentColor',
      transparent: 'transparent',
      red: colors.red,
      grey: colors.blueGray,
      'primary-50': 'var(--primary-50)',
      'primary-100': 'var(--primary-100)',
      'primary-200': 'var(--primary-200)',
      'primary-300': 'var(--primary-300)',
      'primary-400': 'var(--primary-400)',
      'primary-500': 'var(--primary-500)',
      'primary-600': 'var(--primary-600)',
      'primary-700': 'var(--primary-700)',
      'primary-800': 'var(--primary-800)',
      'primary-900': 'var(--primary-900)',
    },
    zIndex: {
      1: 1,
      header: 2,
    },
  },
  variants: {
    extend: {},
  },
  mode: 'jit',
  plugins: [require('@tailwindcss/line-clamp')],
};
