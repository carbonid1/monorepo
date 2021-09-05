import { getSession } from 'next-auth/client';
import type { GetServerSideProps, NextPage } from 'next';
import NextImage from 'next/image';
import NextLink from 'next/link';
import slugify from 'slugify';
import { ROUTE } from 'lib/consts/routes';
import { ServerError } from 'lib/components/@errors';
import { IndexPage_BooksDocument, useIndexPage_BooksQuery } from 'lib/generated/graphql';
import { initializeApollo } from 'lib/apollo';

const HomePage: NextPage = () => {
  const { data, error } = useIndexPage_BooksQuery();
  const { books = [] } = data ?? {};

  if (error) return <ServerError />;

  return (
    <div className="grid justify-center gap-6 pt-4" style={{ gridTemplateColumns: 'repeat(auto-fit, 160px)' }}>
      {books.map(({ id, editions }, index) => (
        <NextLink
          key={id + index}
          href={`/${ROUTE.book}/${editions[0].id}.${slugify(editions[0].title, { lower: false })}`}
        >
          <span className="cursor-pointer rounded transition duration-500 hover:shadow-xl transform hover:scale-[1.05] h-[240px]">
            <NextImage
              width="160px"
              height="240px"
              className="rounded"
              src={editions[0].cover || ''}
              alt={editions[0].title} // TODO: add default src
            />
          </span>
        </NextLink>
      ))}
    </div>
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
