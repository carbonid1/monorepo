const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./{pages,docs,lib}/**/*.{js,ts,jsx,tsx,mdx}'], // list all the folders
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      white: 'white',
      current: 'currentColor',
      transparent: 'transparent',
      red: colors.red,
      grey: colors.blueGray,
      blue: colors.lightBlue,
    },
    zIndex: {
      1: 1,
      header: 2,
    },
    screens: {
      xs: '380px',
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {},
  },
  mode: 'jit',
  plugins: [require('@tailwindcss/line-clamp')],
};
