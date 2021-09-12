import { createGlobalStyle, css } from 'styled-components';

const vars = css`
  :root {
    --font-bold: 700;
    --font-medium: 500;
    --color-blue-1: #dbeafe;
    --color-blue-2: #bfdbfe;
    --color-blue-3: #93c5fd;
    --color-blue-4: #60a5fa;
    --color-blue-5: #3b82f6;
    --color-blue-6: #2563eb;
    --color-yellow-1: #fef3c7;
    --color-yellow-2: #fff0b2;
    --color-yellow-3: #fde68a;
    --color-yellow-4: #fcd34d;
    --color-yellow-5: #fbbf24;
    --color-yellow-6: #f59e0b;
    --color-grey-1: #f3f4f6;
    --color-grey-2: #e5e7eb;
    --color-grey-3: #d1d5db;
    --color-grey-4: #9ca3af;
    --color-grey-5: #6b7280;
    --color-grey-6: #4b5563;
    --color-grey-7: #374151;
    --color-grey-8: #1f2937;
    --color-grey-9: #111827;
    --color-primary-1: var(--color-blue-1);
    --color-primary-2: var(--color-blue-2);
    --color-primary-3: var(--color-blue-3);
    --color-primary-4: var(--color-blue-4);
    --color-primary-5: var(--color-blue-5);
    --color-primary-6: var(--color-blue-6);
    --color-text: rgba(14, 20, 27, 1);
    --color-bg: #fff;
    --color-bg-dimmed: #19232d;
    --color-border-primary: var(--color-grey-7);
    @media (prefers-color-scheme: dark) {
      --color-primary-1: var(--color-yellow-1);
      --color-primary-2: var(--color-yellow-2);
      --color-primary-3: var(--color-yellow-3);
      --color-primary-4: var(--color-yellow-4);
      --color-primary-5: var(--color-yellow-5);
      --color-primary-6: var(--color-yellow-6);
      --color-text: #fff;
      --color-bg: rgba(14, 20, 27, 1);
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
    background: var(--color-bg);
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
