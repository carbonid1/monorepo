import React, { MouseEventHandler } from 'react';
import NextLink from 'next/link';
import slugify from 'slugify';
import $ from './styled';

type ReactAnchor = JSX.IntrinsicElements['button'];
type Color = 'default' | 'accent';
export interface TextLinkProps {
  className?: ReactAnchor['className'];
  style?: ReactAnchor['style'];
  onClick?: MouseEventHandler;
  path?: string;
  slug?: string;
  color?: Color;
}

const TextLink: React.FC<TextLinkProps> = ({ path, slug, children, color = 'default', ...props }) => {
  const style = {
    ...props.style,
    '--color': color === 'default' ? 'rgba(14, 165, 233, 1)' : 'white',
  };

  if (!path) {
    return (
      <$.Button {...props} style={style}>
        {children}
      </$.Button>
    );
  } else {
    const href = slug ? `${path}.${slugify(slug, { lower: false })}` : path;

    return (
      <NextLink href={href}>
        <$.AnchorButton {...props} as="a" href={href} style={style}>
          {children}
        </$.AnchorButton>
      </NextLink>
    );
  }
};

export default TextLink;
