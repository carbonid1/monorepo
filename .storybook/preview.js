import '../styles/globals.css';
import * as nextImage from 'next/image';
import { addDecorator } from '@storybook/react';
import { initializeWorker, mswDecorator } from 'msw-storybook-addon';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// Mock Service Worker addon
initializeWorker();
addDecorator(mswDecorator);

// use <img> instead of Next.js <Image />
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => <img {...props} />,
});

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
