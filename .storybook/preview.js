import * as nextImage from 'next/image';
import '../styles/globals.css';
import { isSSR } from 'lib/utils';

// start mock service worker
if (!isSSR()) {
  const { worker } = require('../lib/mocks/browser');
  worker.start();
}

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
