import React, { MouseEventHandler } from 'react';
import NextLink from 'next/link';
import slugify from 'slugify';
import cn from 'classnames';
import $ from './index.module.scss';

type ReactAnchor = JSX.IntrinsicElements['button'];
type Color = 'base' | 'text';
export interface TextLinkProps {
  className?: ReactAnchor['className'];
  style?: ReactAnchor['style'];
  onClick?: MouseEventHandler;
  path?: string;
  slug?: string;
  color?: Color;
}

const TextLink: React.FC<TextLinkProps> = ({ path, slug, children, className, color, ...props }) => {
  if (!path) {
    return (
      <button
        {...props}
        className={cn(
          'leading-tight text-skin-link-base transition-shadow duration-500 hover:duration-1000 shadow-md',
          {
            'text-skin-link-text': color === 'text',
          },
          $.underlineShadow,
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
          href={href}
          className={cn(
            'text-skin-link-base transition-shadow duration-500 hover:duration-1000',
            {
              'text-skin-link-text': color === 'text',
            },
            $.underlineShadow,
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
