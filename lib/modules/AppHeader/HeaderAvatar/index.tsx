import NextLink from 'next/link';
import NextImage from 'next/image';
import * as Avatar from '@radix-ui/react-avatar';
import { ROUTE } from 'lib/consts/routes';
import useProfile from 'lib/hooks/useProfile';

export const HeaderAvatar: React.FC = () => {
  const { profile } = useProfile();

  if (!profile) return null;

  return (
    <NextLink href={`/${ROUTE.settings}`}>
      <a className="w-12 h-12 overflow-hidden rounded-full cursor-pointer bg-skin-tertiary">
        <Avatar.Root>
          <Avatar.Image
            width={48}
            height={48}
            alt={profile.name ?? 'user'}
            src={profile.image ?? undefined}
            className="rounded-full animate-fadeIn"
          />
          <Avatar.Fallback delayMs={1000} asChild>
            <NextImage
              width={48}
              height={48}
              alt={profile.name ?? 'user'}
              className="rounded-full animate-fadeIn"
              src={`https://avatars.dicebear.com/api/bottts/${profile.id}.svg`}
            />
          </Avatar.Fallback>
        </Avatar.Root>
      </a>
    </NextLink>
  );
};
