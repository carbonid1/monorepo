import React, { MouseEventHandler } from 'react';
import NextLink from 'next/link';
import slugify from 'slugify';
import cn from 'classnames';

type ReactAnchor = JSX.IntrinsicElements['a'];
type Color = 'default' | 'accent';
export interface TextLinkProps {
  className?: ReactAnchor['className'];
  onClick?: MouseEventHandler;
  path?: string;
  slug?: string;
  color?: Color;
}

const TextLink: React.FC<TextLinkProps> = ({ path, slug, children, className, color = 'default', ...props }) => {
  if (!path) {
    return (
      <button
        {...props}
        className={cn(
          'hover:underline cursor-pointer leading-tight',
          {
            'text-blue-500': color === 'default',
            'text-white': color === 'accent',
          },
          className,
        )}
      >
        {children}
      </button>
    );
  } else {
    const href = slug ? `${path}.${slugify(slug, { lower: false })}` : path;

    return (
      <NextLink href={href}>
        <a
          {...props}
          className={cn(
            'hover:underline cursor-pointer',
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
  }
};

export default TextLink;
