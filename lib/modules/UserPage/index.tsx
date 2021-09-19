import type { GetServerSideProps, NextPage } from 'next';
import { CustomHead } from 'lib/components/CustomHead';
import { ServerError } from 'lib/components/@errors';
import { initializeApollo } from 'lib/apollo';
import gg from 'lib/generated';
import { TextLink } from 'lib/components';
import { ROUTE } from 'lib/consts/routes';

interface UserPage {
  id: string;
}

const UserPage: NextPage<UserPage> = ({ id }) => {
  const { data, error } = gg.useUserPage({ variables: { id } });
  const { user } = data ?? {};
  const { name } = user ?? {};

  if (error) return <ServerError />;
  return (
    <>
      <CustomHead title={name} />
      <div>
        <div className="mb-4 text-4xl">
          Welcome <b>{name}</b>!
        </div>
        <TextLink path={`/${ROUTE.settings}`}>Go to settings</TextLink>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const id = ctx.query.id as string;

  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<gg.UserPage, gg.UserPageVariables>({
    query: gg.UserPageDocument,
    variables: { id },
  });

  if (!data.user) {
    return {
      props: {},
      redirect: {
        destination: '/404',
      },
    };
  }

  return {
    props: {
      id,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default UserPage;
