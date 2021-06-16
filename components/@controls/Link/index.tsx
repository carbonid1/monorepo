import React from 'react';
import NextLink, { LinkProps } from 'next/link';
import slugify from 'slugify';

export interface ILink extends Omit<LinkProps, 'href'> {
  children: React.ReactNode;
  path: string;
  slug?: string;
}

export const Link: React.FC<ILink> = ({ children, path, slug, ...linkProps }) => {
  const href = slug ? `${path}.${slugify(slug, { lower: false })}` : path;
  return (
    <NextLink {...linkProps} href={href}>
      <a className="text-primary-500 rounded-full hover:underline">{children}</a>
    </NextLink>
  );
};
