import { signIn, signOut, useSession } from 'next-auth/client';
import NextImg from 'next/image';
import cn from 'classnames';
import { TextLink } from 'lib/components';
import $ from './index.module.scss';

export const AppHeader: React.FC = () => {
  const { user } = useSession()[0] ?? {};

  return (
    <div className="sticky top-0 flex items-center w-full h-16 z-header justify-items-center">
      <div className="flex items-center flex-1 max-w-5xl p-4 mx-auto">
        <TextLink path="/" className={cn('mr-auto text-3xl font-bold', $.textLink)}>
          BookHub
        </TextLink>
        {user?.image && <NextImg className="rounded-full" src={user?.image} alt="profile" height={48} width={48} />}
        <TextLink className={cn('ml-4 font-bold', $.textLink)} onClick={user ? () => signOut() : () => signIn()}>
          {user ? 'Sign Out' : 'Sign In'}
        </TextLink>
      </div>
    </div>
  );
};
