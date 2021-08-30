import React from 'react';
import NextLink from 'next/link';
import slugify from 'slugify';
import cn from 'classnames';

type ReactAnchor = JSX.IntrinsicElements['a'];
type Color = 'default' | 'accent';
export interface ILink extends ReactAnchor {
  path: string;
  slug?: string;
  color?: Color;
}

export const Link: React.FC<ILink> = ({ path, slug, children, className, color = 'default', ...props }) => {
  const href = slug ? `${path}.${slugify(slug, { lower: false })}` : path;

  return (
    <NextLink href={href}>
      <a
        {...props}
        className={cn(
          'hover:underline cursor-pointer leading-5',
          {
            'text-blue-500': color === 'default',
            'text-white': color === 'accent',
          },
          className,
        )}
      >
        {children}
      </a>
    </NextLink>
  );
};
