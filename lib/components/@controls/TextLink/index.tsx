import React, { MouseEventHandler } from 'react';
import NextLink from 'next/link';
import slugify from 'slugify';
import $ from './styled';

type ReactAnchor = JSX.IntrinsicElements['button'];
export interface TextLinkProps {
  className?: ReactAnchor['className'];
  style?: ReactAnchor['style'];
  onClick?: MouseEventHandler;
  path?: string;
  slug?: string;
}

const TextLink: React.FC<TextLinkProps> = ({ path, slug, children, ...props }) => {
  if (!path) {
    return <$.Button {...props}>{children}</$.Button>;
  } else {
    const href = slug ? `${path}.${slugify(slug, { lower: false })}` : path;

    return (
      <NextLink href={href}>
        <$.AnchorButton {...props} as="a" href={href}>
          {children}
        </$.AnchorButton>
      </NextLink>
    );
  }
};

export default TextLink;
