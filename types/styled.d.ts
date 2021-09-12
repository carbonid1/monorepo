import 'styled-components';

interface Breakpoints {
  xl: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: Breakpoints;
  }
}
