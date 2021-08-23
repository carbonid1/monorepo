import { ROUTE } from 'lib/consts/routes';
import { Link } from 'lib/components/@controls/Link';
import { Authors } from 'lib/components/Authors';
import { IndexPage_BooksDocument, useIndexPage_BooksQuery } from 'lib/generated/graphql';
import { ServerError } from 'lib/components/@errors';
import { initializeApollo } from 'lib/apollo';

export default function HomePage() {
  const { data, error } = useIndexPage_BooksQuery();
  const { books = [] } = data ?? {};

  if (error) return <ServerError />;

  return (
    <ul>
      {books.map(({ id, authors, editions }, index) => (
        <li key={id + index}>
          <Authors authors={authors} lastAuthorSuffix=": " />
          <Link path={`/${ROUTE.book}/${editions[0].id}`} slug={editions[0].title}>
            {editions[0].title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: IndexPage_BooksDocument });
  return { props: { initialApolloState: apolloClient.cache.extract() } };
};
