import type { GetServerSideProps, NextPage } from 'next';
import { ClientSafeProvider, getProviders, getSession, signin } from 'next-auth/client';
import { GoogleIcon, GitHubIcon, TwitterIcon, FacebookIcon } from 'lib/icons';
import { isSSR } from 'lib/utils';
import { errors } from 'lib/consts/errors';

type TSignInProviders = 'google' | 'github' | 'twitter' | 'facebook';
export interface SignInPageProps {
  providers: Record<TSignInProviders, ClientSafeProvider>;
  error: string | undefined;
}

const SignInPage: NextPage<SignInPageProps> = ({ providers, error }) => {
  if (error && !isSSR()) alert(error);

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="grid gap-4 p-6 transition-transform duration-300 shadow-md rounded-xl focus-within:shadow-xl focus-within:translate-y-[-4px] focus-within:transform text-skin-complement bg-skin-base dark:text-skin-base  dark:bg-skin-complement dark:focus-within:transform-none dark:border-skin-base dark:border">
        <button
          onClick={() => signin(providers?.twitter.id)}
          className="flex items-center w-full max-w-xs p-4 text-sm font-medium xs:text-xl rounded-xl"
        >
          <TwitterIcon className="mr-4 text-xl xs:text-3xl" />
          Continue with Twitter
        </button>
        <button
          onClick={() => signin(providers?.google.id)}
          className="flex items-center w-full max-w-xs p-4 text-sm font-medium xs:text-xl rounded-xl"
        >
          <GoogleIcon className="mr-4 text-xl xs:text-3xl" />
          Continue with Google
        </button>
        <button
          onClick={() => signin(providers?.github.id)}
          className="flex items-center w-full max-w-xs p-4 text-sm font-medium xs:text-xl rounded-xl"
        >
          <GitHubIcon className="mr-4 text-xl xs:text-3xl" />
          Continue with GitHub
        </button>
        <button
          onClick={() => signin(providers?.facebook.id)}
          className="flex items-center w-full max-w-xs p-4 text-sm font-medium xs:text-xl rounded-xl"
        >
          <FacebookIcon className="mr-4 text-xl xs:text-3xl" />
          Continue with Facebook
        </button>
      </div>
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
      error: ctx.query.error === 'OAuthAccountNotLinked' ? errors.OAuthAccountNotLinked : null,
    },
  };
};

export default SignInPage;
