import { signIn, signOut } from 'next-auth/client';
import { TextLink } from 'lib/components';
import useProfile from 'lib/hooks/useProfile';
import { HeaderAvatar } from './HeaderAvatar';

export const AppHeader: React.FC = () => {
  const { profile } = useProfile();

  return (
    <div className="sticky top-0 flex items-center w-full bg-skin-base z-header justify-items-center">
      <div className="flex items-center flex-1 max-w-5xl p-4 mx-auto">
        <TextLink path="/" className="mr-auto text-3xl font-bold" color="text">
          BookHub
        </TextLink>
        <HeaderAvatar />
        <TextLink className="ml-4 font-bold" color="text" onClick={profile ? () => signOut() : () => signIn()}>
          {profile ? 'Sign Out' : 'Sign In'}
        </TextLink>
      </div>
    </div>
  );
};
