import { createGlobalStyle, css } from 'styled-components';

const vars = css`
  :root {
    --opacity: 1;
    --font-bold: 700;
    --color-primary: rgba(13, 162, 231, var(--opacity));
    --color-text: rgba(14, 20, 27, var(--opacity));
    --color-background: rgba(255, 255, 255, var(--opacity));
    @media (prefers-color-scheme: dark) {
      --color-primary: rgba(228, 231, 13, var(--opacity));
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
  ul,
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
