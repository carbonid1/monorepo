import { Link } from 'lib/components/@controls/Link';
import NextImg from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/client';

export const AppHeader: React.FC = () => {
  const { user } = useSession()[0] ?? {};

  return (
    <div className="sticky top-0 flex items-center w-full h-16 bg-blue-600 bg-opacity-50 backdrop-filter backdrop-blur z-header justify-items-center">
      <div className="flex items-center flex-1 max-w-5xl p-4 mx-auto">
        <Link path="/" className="font-bold mr-auto text-3xl" color="accent">
          BookHub
        </Link>
        {user?.image && <NextImg className="rounded-full" src={user?.image} alt="profile" height={48} width={48} />}
        <Link className="font-bold ml-4" color="accent" onClick={user ? () => signOut() : () => signIn()}>
          {user ? 'Sign Out' : 'Sign In'}
        </Link>
      </div>
    </div>
  );
};
