const colors = require('tailwindcss/colors'); // remove
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./{pages,docs,lib}/**/*.{js,ts,jsx,tsx,mdx}'], // list all the folders
  darkMode: 'media',
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          complement: 'var(--color-text-complement)',
          'link-base': 'var(--color-link-base)',
          'link-text': 'var(--color-link-text)',
          skeleton: 'var(--color-skeleton)',
        },
      },
      backgroundColor: {
        skin: {
          base: 'var(--color-background-base)',
          complement: 'var(--color-background-complement)',
          skeleton: 'var(--color-skeleton)',
        },
      },
      borderColor: {
        skin: {
          base: 'var(--color-border-base)'
        }
      }
    },
    colors: {
      white: 'white', // remove
      current: 'currentColor',
      transparent: 'transparent',
      red: colors.red, // remove
      grey: colors.blueGray, // remove
      blue: colors.lightBlue, // remove
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
