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
      blue: colors.lightBlue,
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
