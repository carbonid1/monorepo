import { createGlobalStyle, css } from 'styled-components';

const vars = css`
  :root {
    --opacity: 1;
    --font-bold: 700;
    --font-medium: 500;
    --color-primary: rgba(13, 162, 231, var(--opacity));
    --color-text: rgba(14, 20, 27, var(--opacity));
    --color-background: rgba(255, 255, 255, var(--opacity));
    --color-grey-200: rgba(229, 231, 235, var(--opacity));
    --color-grey-500: rgba(107, 114, 128, var(--opacity));
    --color-grey-600: rgba(75, 85, 99, var(--opacity));
    --color-grey-700: rgba(55, 65, 81, var(--opacity));
    @media (prefers-color-scheme: dark) {
      --color-primary: rgba(250, 204, 21, var(--opacity));
      --color-text: rgba(255, 255, 255, var(--opacity));
      --color-background: rgba(14, 20, 27, var(--opacity));
    }
  }
`;

const base = css`
  html,
  body,
  #__next {
    height: 100%;
  }

  body {
    background: var(--color-background);
    color: var(--color-text);
  }

  #__next {
    display: flex;
    flex-direction: column;
  }

  a,
  button {
    &:focus {
      outline: none;
    }
  }
`;

const GlobalStyles = createGlobalStyle`
  ${vars}
  ${base}
`;

export default GlobalStyles;
