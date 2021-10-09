import { signIn, signOut } from 'next-auth/client';
import NextLink from 'next/link';
import NextImg from 'next/image';
import { TextLink } from 'lib/components';
import { ROUTE } from 'lib/consts/routes';
import useProfile from 'lib/hooks/useProfile';

export const AppHeader: React.FC = () => {
  const { profile } = useProfile();

  return (
    <div className="sticky top-0 flex items-center w-full h-16 bg-skin-base z-header justify-items-center">
      <div className="flex items-center flex-1 max-w-5xl p-4 mx-auto">
        <TextLink path="/" className="mr-auto text-3xl font-bold" color="text">
          BookHub
        </TextLink>
        {profile?.image && (
          <NextLink href={`/${ROUTE.settings}`}>
            <a className="h-12 overflow-hidden rounded-full cursor-pointer shadow-round">
              <NextImg className="rounded-full" src={profile?.image} alt="profile" height={48} width={48} />
            </a>
          </NextLink>
        )}
        <TextLink className="ml-4 font-bold" color="text" onClick={profile ? () => signOut() : () => signIn()}>
          {profile ? 'Sign Out' : 'Sign In'}
        </TextLink>
      </div>
    </div>
  );
};
