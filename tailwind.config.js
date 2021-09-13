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
          primary: 'var(--color-primary)',
          'primary-light': 'var(--color-primary-light)',
          'primary-dark': 'var(--color-primary-dark)',
          skeleton: 'var(--color-skeleton)',
          placeholder: 'var(--color-placeholder)',
        },
      },
      backgroundColor: {
        skin: {
          base: 'var(--color-background-base)',
          complement: 'var(--color-background-complement)',
          primary: 'var(--color-primary)',
          'primary-light': 'var(--color-primary-light)',
          'primary-dark': 'var(--color-primary-dark)',
          skeleton: 'var(--color-skeleton)',
          'button-base': 'var(--color-background-button-base)',
        },
      },
      borderColor: {
        skin: {
          base: 'var(--color-border-base)',
        },
      },
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
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
