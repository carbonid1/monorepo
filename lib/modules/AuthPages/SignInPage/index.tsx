import type { GetServerSideProps, NextPage } from 'next';
import { ClientSafeProvider, getProviders, getSession, signin } from 'next-auth/client';
import { GoogleIcon, GitHubIcon, TwitterIcon, FacebookIcon } from 'lib/icons';
import { isSSR } from 'lib/utils';
import { errors } from 'lib/consts/errors';
import $ from './styled';

type TSignInProviders = 'google' | 'github' | 'twitter' | 'facebook';
export interface SignInPageProps {
  providers: Record<TSignInProviders, ClientSafeProvider>;
  error: string | undefined;
}

const SignInPage: NextPage<SignInPageProps> = ({ providers, error }) => {
  if (error && !isSSR()) alert(error);

  return (
    <$.Root>
      <$.Buttons>
        <$.Button onClick={() => signin(providers?.twitter.id)}>
          <TwitterIcon />
          Continue with Twitter
        </$.Button>
        <$.Button onClick={() => signin(providers?.google.id)}>
          <GoogleIcon />
          Continue with Google
        </$.Button>
        <$.Button onClick={() => signin(providers?.github.id)}>
          <GitHubIcon />
          Continue with GitHub
        </$.Button>
        <$.Button onClick={() => signin(providers?.facebook.id)}>
          <FacebookIcon />
          Continue with Facebook
        </$.Button>
      </$.Buttons>
    </$.Root>
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
      error: ctx.query.error === 'OAuthAccountNotLinked' ? errors.OAuthAccountNotLinked : null,
    },
  };
};

export default SignInPage;
