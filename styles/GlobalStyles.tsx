import { createGlobalStyle, css } from 'styled-components';

const vars = css`
  :root {
    --color-primary: rgba(14, 165, 233, 1);
  }
`;

const base = css`
  html,
  body,
  #__next {
    height: 100%;
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
