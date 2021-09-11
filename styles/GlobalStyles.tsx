import { createGlobalStyle, css } from 'styled-components';

const vars = css`
  :root {
    --color-primary: rgba(14, 165, 233, 1);
  }
`;

const GlobalStyles = createGlobalStyle`
  ${vars}
`;

export default GlobalStyles;
