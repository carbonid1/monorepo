const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./{pages,components,modules,docs}/**/*.{js,ts,jsx,tsx,mdx}'], // list all the folders
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'white',
      grey: colors.blueGray,
      red: colors.red,
      blue: colors.lightBlue,
      green: colors.teal,
    },
  },
  variants: {
    extend: {},
  },
  mode: 'jit',
  plugins: [require('@tailwindcss/line-clamp')],
};
