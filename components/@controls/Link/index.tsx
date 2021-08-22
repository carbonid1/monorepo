import React from 'react';
import NextLink from 'next/link';
import slugify from 'slugify';
import cn from 'classnames';

type ReactAnchor = JSX.IntrinsicElements['a'];
export interface ILink extends ReactAnchor {
  path?: string;
  slug?: string;
}

export const Link: React.FC<ILink> = ({ children, path, slug, className, ...props }) => {
  const anchor = (
    <a className={cn('text-blue-500 hover:underline cursor-pointer', className)} {...props}>
      {children}
    </a>
  );

  if (!path) return anchor;

  const href = slug ? `${path}.${slugify(slug, { lower: false })}` : path;

  return <NextLink href={href}>{anchor}</NextLink>;
};
