import { useWindowSize } from './useWindowSize';
import theme from 'tailwindcss/defaultTheme';

export const useIsSmScreen = (): boolean => {
  const windowWidth = Number(useWindowSize().width);

  const breakpointWidth = Number(theme.screens?.sm.split('px')[0]);
  return windowWidth >= breakpointWidth;
};
