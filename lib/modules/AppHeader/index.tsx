import { signIn, signOut, useSession } from 'next-auth/client';
import NextImg from 'next/image';
import { TextLink } from 'lib/components';

export const AppHeader: React.FC = () => {
  const { user } = useSession()[0] ?? {};

  return (
    <div className="sticky top-0 flex items-center w-full h-16 bg-skin-base z-header justify-items-center">
      <div className="flex items-center flex-1 max-w-5xl p-4 mx-auto">
        <TextLink path="/" className="mr-auto text-3xl font-bold" color="text">
          BookHub
        </TextLink>
        {user?.image && <NextImg className="rounded-full" src={user?.image} alt="profile" height={48} width={48} />}
        <TextLink className="ml-4 font-bold" color="text" onClick={user ? () => signOut() : () => signIn()}>
          {user ? 'Sign Out' : 'Sign In'}
        </TextLink>
      </div>
    </div>
  );
};
