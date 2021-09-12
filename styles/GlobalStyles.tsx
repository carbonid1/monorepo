import { createGlobalStyle, css } from 'styled-components';

const vars = css`
  :root {
    --font-bold: 700;
    --font-medium: 500;
    --color-blue-100: #dbeafe;
    --color-blue-400: #60a5fa;
    --color-blue-500: #3b82f6;
    --color-yellow-100: #fef3c7;
    --color-yellow-200: #fff0b2;
    --color-yellow-300: #fde68a;
    --color-yellow-400: #fcd34d;
    --color-yellow-500: #fbbf24;
    --color-grey-200: #e5e7eb;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-900: #111827;
    --color-primary-100: var(--color-blue-100);
    --color-primary-400: var(--color-blue-400);
    --color-primary-500: var(--color-blue-500);
    --color-text: rgba(14, 20, 27, 1);
    --color-background: #fff;
    @media (prefers-color-scheme: dark) {
      --color-primary-100: var(--color-yellow-100);
      --color-primary-400: var(--color-yellow-400);
      --color-primary-500: var(--color-yellow-500);
      --color-text: #fff;
      --color-background: rgba(14, 20, 27, 1);
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
