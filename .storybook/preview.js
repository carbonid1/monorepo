import * as nextImage from 'next/image';
import '../styles/globals.css';

// use <img> instead of Next.js <Image />
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => {
    return <img {...props} />;
  },
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
