import type { GetServerSideProps } from 'next';
import { ClientSafeProvider, getProviders } from 'next-auth/client';

export interface ISignInPage {
  providers: ClientSafeProvider[];
}

const SignInPage: React.FC<ISignInPage> = ({ providers }) => {
  return (
    <>
      {providers.map(provider => (
        <div key={provider.id}>{provider.name}</div>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignInPage;
