import type { GetServerSideProps } from 'next';
import { getProviders, getSession, signin } from 'next-auth/client';

export interface ISignInPage {
  providers: ReturnType<typeof getProviders>;
}

const SignInPage: React.FC<ISignInPage> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map(provider => (
        <button key={provider.id} onClick={() => signin(provider.id)}>
          {provider.name}
        </button>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx);

  if (session && typeof ctx.query.callbackUrl === 'string') {
    return {
      props: {},
      redirect: {
        destination: ctx.query.callbackUrl,
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
