import { ReviewPage_ReviewDocument, ReviewPage_ReviewQuery, ReviewPage_ReviewQueryVariables } from 'generated/graphql';
import { initializeApollo } from 'lib/apollo';
import type { GetServerSideProps } from 'next';

export { default } from 'modules/ReviewPage';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string;

  const apolloClient = initializeApollo();
  await apolloClient.query<ReviewPage_ReviewQuery, ReviewPage_ReviewQueryVariables>({
    query: ReviewPage_ReviewDocument,
    variables: { id },
  });

  return {
    props: { initialApolloState: apolloClient.cache.extract(), id },
  };
};
