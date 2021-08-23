import { BookPage_EditionDocument, BookPage_EditionQuery, BookPage_EditionQueryVariables } from 'generated/graphql';
import { initializeApollo } from 'lib/apollo';
import { extractIdFromSlug } from 'lib/utils';
import type { GetServerSideProps } from 'next';

export { default } from 'modules/BookPage';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug as string;
  const id = extractIdFromSlug(slug);

  const apolloClient = initializeApollo();
  await apolloClient.query<BookPage_EditionQuery, BookPage_EditionQueryVariables>({
    query: BookPage_EditionDocument,
    variables: { id },
  });

  return {
    props: { initialApolloState: apolloClient.cache.extract(), id },
  };
};
