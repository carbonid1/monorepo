import NextLink from 'next/link';
import NextImg from 'next/image';
import { ROUTE } from 'lib/consts/routes';
import useProfile from 'lib/hooks/useProfile';

export const HeaderAvatar: React.FC = () => {
  const { profile } = useProfile();

  if (!profile) return null;

  return (
    <NextLink href={`/${ROUTE.settings}`}>
      <a className="w-12 h-12 overflow-hidden rounded-full cursor-pointer bg-skin-tertiary">
        {profile.image && (
          <NextImg className="rounded-full animate-fadeIn" src={profile?.image} alt="profile" height={48} width={48} />
        )}
      </a>
    </NextLink>
  );
};
