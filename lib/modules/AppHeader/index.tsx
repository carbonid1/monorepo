import { Link } from 'lib/components/@controls/Link';
import styles from './index.module.css';
import NextImg from 'next/image';
import cn from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/client';

export const AppHeader: React.FC = () => {
  const [session] = useSession();

  return (
    <div className="sticky top-0 flex items-center w-full h-16 bg-blue-600 bg-opacity-50 backdrop-filter backdrop-blur z-header justify-items-center">
      <div className="flex items-center flex-1 max-w-5xl p-4 mx-auto">
        <Link path="/" className={cn(styles.link, 'mr-auto text-3xl')}>
          BookHub
        </Link>
        {session && (
          <>
            {session.user?.image && (
              <NextImg className="rounded-full" src={session.user?.image} alt="profile" height={48} width={48} />
            )}
            <Link className={cn(styles.link, 'ml-4')} onClick={session.user ? () => signOut() : () => signIn()}>
              {session.user ? 'Sign Out' : 'Sign In'}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
