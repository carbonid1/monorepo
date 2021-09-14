const defaultTheme = require('tailwindcss/defaultTheme');

const withOpacity = variableName => {
  return ({ opacityValue }) => {
    if (opacityValue) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
};

module.exports = {
  purge: ['./{pages,docs,lib}/**/*.{js,ts,jsx,tsx,mdx}'], // list all the folders
  darkMode: 'media',
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity('--color-text-base'),
          complement: withOpacity('--color-text-complement'),
          primary: withOpacity('--color-primary'),
          'primary-light': withOpacity('--color-primary-light'),
          'primary-dark': withOpacity('--color-primary-dark'),
          skeleton: withOpacity('--color-skeleton'),
          placeholder: withOpacity('--color-placeholder'),
        },
      },
      backgroundColor: {
        skin: {
          base: withOpacity('--color-background-base'),
          complement: withOpacity('--color-background-complement'),
          primary: withOpacity('--color-primary'),
          'primary-light': withOpacity('--color-primary-light'),
          'primary-dark': withOpacity('--color-primary-dark'),
          skeleton: withOpacity('--color-skeleton'),
          'button-base': withOpacity('--color-background-button-base'),
        },
      },
      borderColor: {
        skin: {
          base: withOpacity('--color-border-base'),
        },
      },
      ringColor: {
        skin: {
          primary: withOpacity('--color-primary'),
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
