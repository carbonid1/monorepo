import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import { CustomHead } from 'lib/components/CustomHead';
import { ROUTE } from 'lib/consts/routes';

const SettingsPage: NextPage = () => {
  return (
    <>
      <CustomHead title="Settings" />
      <div>Settings</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: `/${ROUTE.signIn}`,
      },
    };
  }

  return {
    props: {},
  };
};

export default SettingsPage;
