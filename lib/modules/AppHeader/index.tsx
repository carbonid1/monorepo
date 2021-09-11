import { signIn, signOut, useSession } from 'next-auth/client';
import $ from './styled';

export const AppHeader: React.FC = () => {
  const { user } = useSession()[0] ?? {};

  return (
    <$.Root className="z-header">
      <$.Inner>
        <$.LogoLink path="/">BookHub</$.LogoLink>
        {user?.image && <$.Img src={user?.image} alt="profile" height={48} width={48} />}
        <$.SignInBtn onClick={user ? () => signOut() : () => signIn()}>{user ? 'Sign Out' : 'Sign In'}</$.SignInBtn>
      </$.Inner>
    </$.Root>
  );
};
