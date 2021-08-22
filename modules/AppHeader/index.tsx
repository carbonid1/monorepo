import { Link } from 'components/@controls/Link';
import styles from './index.module.css';
import cn from 'classnames';
import { useGoogleAuth } from './hooks';
import { useMeQuery } from 'generated/graphql';

export const AppHeader: React.FC = () => {
  const { signOut, signIn } = useGoogleAuth();
  const { profile } = useMeQuery().data ?? {};

  return (
    <div className="sticky top-0 flex items-center w-full h-16 p-8 bg-blue-600 bg-opacity-50 backdrop-filter backdrop-blur z-header justify-items-center">
      <div className="flex items-center flex-1 max-w-5xl p-4 mx-auto">
        <Link path="/" className={cn(styles.link, 'mr-auto text-3xl')}>
          BookHub
        </Link>
        {profile?.picture && <img className="h-12 mr-4 rounded-full" src={profile.picture} alt="profile" />}
        <Link className={styles.link} onClick={profile ? signOut : signIn}>
          {profile ? 'Sign Out' : 'Sign In'}
        </Link>
      </div>
    </div>
  );
};
