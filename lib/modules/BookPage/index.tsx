import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import { CustomHead } from 'lib/components/CustomHead';
import { ROUTE } from 'lib/consts/routes';
import { Link } from 'lib/components/@controls/Link';
import { BookReviews } from 'lib/modules/BookReviews';
import { Edition } from 'lib/modules/Edition';
import { NotFound, ServerError } from 'lib/components/@errors';
import { extractIdFromSlug } from 'lib/utils';
import { initializeApollo } from 'lib/apollo';
import gg from 'lib/generated';

interface IBookPage {
  id: string;
}

const BookPage: NextPage<IBookPage> = ({ id }) => {
  const { data, error } = gg.useBookPage_Edition({ variables: { id } });
  const { edition } = data ?? {};

  if (error) return <ServerError />;
  if (!edition || id === null) return <NotFound />;

  const { book } = edition;

  return (
    <div>
      <CustomHead title={edition.title} description={edition.description} />
      <div>
        <Edition edition={edition} className="mb-2" />
        <Link path={`/${ROUTE.editions}/${book.id}`} slug={edition.title}>
          All Editions
        </Link>
        <BookReviews bookId={book.id} editionId={Number(id)} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const slug = ctx.query.slug as string;
  const id = extractIdFromSlug(slug);

  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: gg.BookPage_EditionDocument,
    variables: { id },
  });

  return {
    props: {
      id,
      session: await getSession(ctx),
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default BookPage;
