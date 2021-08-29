import type { GetServerSideProps } from 'next';
import { ClientSafeProvider, getProviders, getSession, signin } from 'next-auth/client';
import { GoogleIcon } from 'lib/icons';

export interface ISignInPage {
  providers: Record<'google', ClientSafeProvider>;
}

const SignInPage: React.FC<ISignInPage> = ({ providers }) => {
  const googleProvider = providers?.google;

  return (
    <div className="flex items-center justify-center flex-1">
      <button
        onClick={() => signin(googleProvider.id)}
        className="flex items-center w-full max-w-xs p-4 text-xl font-medium shadow-md rounded-xl text-grey-600"
      >
        <GoogleIcon className="mr-4 text-2xl" />
        Continue with Google
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx);

  if (session) {
    return {
      props: {},
      redirect: {
        destination: ctx.query.callbackUrl || '/',
      },
    };
  }

  return {
    props: {
      providers: await getProviders(),
    },
  };
};

export default SignInPage;
