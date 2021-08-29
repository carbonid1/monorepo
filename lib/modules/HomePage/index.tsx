import { getSession } from 'next-auth/client';
import type { GetServerSideProps, NextPage } from 'next';
import { ROUTE } from 'lib/consts/routes';
import { Link } from 'lib/components/@controls/Link';
import { Authors } from 'lib/components/Authors';
import { ServerError } from 'lib/components/@errors';
import { IndexPage_BooksDocument, useIndexPage_BooksQuery } from 'lib/generated/graphql';
import { initializeApollo } from 'lib/apollo';

const HomePage: NextPage = () => {
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
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: IndexPage_BooksDocument });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      session: await getSession(ctx),
    },
  };
};

export default HomePage;
