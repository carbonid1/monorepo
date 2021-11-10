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
          tertiary: withOpacity('--color-background-tertiary'),
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
      fill: {
        skin: {
          complement: withOpacity('--color-background-complement'),
        },
      },
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
    },
    zIndex: {
      base: 1,
      'scaled-img': 2,
      header: 3,
      progress: 4,
    },
    screens: {
      xs: '380px',
      ...defaultTheme.screens,
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0 },
        '20%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    },
    animation: {
      fadeIn: 'fadeIn 1s',
    },
  },
  variants: {
    extend: {},
  },
  mode: 'jit',
  plugins: [require('@tailwindcss/line-clamp')],
};
