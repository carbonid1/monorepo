import * as nextImage from 'next/image';
import { addDecorator } from '@storybook/react';
import { initializeWorker, mswDecorator } from 'msw-storybook-addon';
import '../styles/globals.css';

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
};
