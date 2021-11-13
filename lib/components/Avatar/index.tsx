import NextLink, { LinkProps } from 'next/link';
import NextImage, { ImageProps } from 'next/image';
import * as RadixAvatar from '@radix-ui/react-avatar';
import classNames from 'classnames';

export interface AvatarProps {
  src: Maybe<string>;
  className?: string;
  fallbackImgSeed: string;
  alt?: ImageProps['alt'];
  href: LinkProps['href'];
}

export const Avatar: React.FC<AvatarProps> = ({ className, href, alt, src, fallbackImgSeed }) => {
  return (
    <NextLink href={href}>
      <a
        className={classNames(
          'inline-block w-12 h-12 overflow-hidden rounded-full cursor-pointer bg-skin-tertiary',
          className,
        )}
      >
        <RadixAvatar.Root>
          <RadixAvatar.Image
            alt={alt}
            width={48}
            height={48}
            src={src || undefined}
            className="rounded-full animate-fadeIn"
          />
          <RadixAvatar.Fallback delayMs={1000}>
            <NextImage
              alt={alt}
              width={48}
              height={48}
              className="rounded-full animate-fadeIn"
              src={`https://avatars.dicebear.com/api/bottts/${fallbackImgSeed}.svg`}
            />
          </RadixAvatar.Fallback>
        </RadixAvatar.Root>
      </a>
    </NextLink>
  );
};
