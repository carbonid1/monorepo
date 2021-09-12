import 'styled-components';

interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: Breakpoints;
  }
}
