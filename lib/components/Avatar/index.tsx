import NextLink, { LinkProps } from 'next/link';
import NextImage from 'next/image';
import * as RadixAvatar from '@radix-ui/react-avatar';
import classNames from 'classnames';

type TagProps = Omit<JSX.IntrinsicElements['a'], 'href'>;
export interface AvatarProps extends TagProps {
  alt: Maybe<string>;
  src: Maybe<string>;
  className?: string;
  fallbackImgSeed: string;
  href: LinkProps['href'];
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  href,
  alt,
  src,
  fallbackImgSeed,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a
        className={classNames(
          'inline-block w-12 h-12 overflow-hidden rounded-full cursor-pointer bg-skin-tertiary',
          className,
        )}
        {...props}
      >
        <RadixAvatar.Root>
          <RadixAvatar.Image
            width={48}
            height={48}
            alt={alt || undefined}
            src={src || undefined}
            className="rounded-full animate-fadeIn"
          />
          <RadixAvatar.Fallback delayMs={1000}>
            <NextImage
              width={48}
              height={48}
              alt={alt || undefined}
              className="rounded-full animate-fadeIn"
              src={`https://avatars.dicebear.com/api/bottts/${fallbackImgSeed}.svg`}
            />
          </RadixAvatar.Fallback>
        </RadixAvatar.Root>
      </a>
    </NextLink>
  );
};
