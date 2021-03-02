import React from 'react';
import NextLink, { LinkProps } from 'next/link';

export interface ILink extends LinkProps {
  children: React.ReactNode;
}

export const Link: React.FC<ILink> = ({ children, ...linkProps }) => {
  return (
    <NextLink {...linkProps}>
      <a className="text-blue-500 hover:underline">{children}</a>
    </NextLink>
  );
};
