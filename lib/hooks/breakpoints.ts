import theme from 'tailwindcss/defaultTheme';
import { useWindowSize } from './useWindowSize';

export const useIsSmScreen = (): boolean => {
	const windowWidth = Number(useWindowSize().width);

	const breakpointWidth = Number(theme.screens?.sm.split('px')[0]);
	return windowWidth >= breakpointWidth;
};
