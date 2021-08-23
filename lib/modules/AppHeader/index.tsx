import { Link } from 'lib/components/@controls/Link';
import styles from './index.module.css';
import cn from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/client';

export const AppHeader: React.FC = () => {
  const [session] = useSession();

  return (
    <div className="sticky top-0 flex items-center w-full h-16 p-8 bg-blue-600 bg-opacity-50 backdrop-filter backdrop-blur z-header justify-items-center">
      <div className="flex items-center flex-1 max-w-5xl p-4 mx-auto">
        <Link path="/" className={cn(styles.link, 'mr-auto text-3xl')}>
          BookHub
        </Link>
        {/* {profile?.picture && <img className="h-12 mr-4 rounded-full" src={profile.picture} alt="profile" />} */}
        <Link className={styles.link} onClick={session ? () => signOut() : () => signIn()}>
          {session ? 'Sign Out' : 'Sign In'}
        </Link>
      </div>
    </div>
  );
};
