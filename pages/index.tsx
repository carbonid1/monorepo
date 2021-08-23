import { IndexPage_BooksDocument } from 'generated/graphql';
import { initializeApollo } from 'lib/apollo';

export { default as default } from 'modules/HomePage';

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: IndexPage_BooksDocument });
  return { props: { initialApolloState: apolloClient.cache.extract() } };
};
