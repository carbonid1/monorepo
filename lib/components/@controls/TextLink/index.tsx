import React, { MouseEventHandler } from 'react';
import NextLink from 'next/link';
import slugify from 'slugify';
import cn from 'classnames';

type ReactAnchor = JSX.IntrinsicElements['button'];
export interface TextLinkProps {
  className?: ReactAnchor['className'];
  style?: ReactAnchor['style'];
  onClick?: MouseEventHandler;
  path?: string;
  slug?: string;
}

const TextLink: React.FC<TextLinkProps> = ({ path, slug, children, className, ...props }) => {
  if (!path) {
    return (
      <button {...props} className={cn('hover:underline cursor-pointer leading-tight', className)}>
        {children}
      </button>
    );
  } else {
    const href = slug ? `${path}.${slugify(slug, { lower: false })}` : path;

    return (
      <NextLink href={href}>
        <a {...props} href={href} className={cn('hover:underline cursor-pointer', className)}>
          {children}
        </a>
      </NextLink>
    );
  }
};

export default TextLink;
