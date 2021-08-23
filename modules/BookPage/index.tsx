import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/@controls/Link';
import { BookReviews } from 'modules/BookReviews';
import { Edition } from 'modules/Edition';
import {
  BookPage_EditionDocument,
  BookPage_EditionQuery,
  BookPage_EditionQueryVariables,
  useBookPage_EditionQuery,
} from 'generated/graphql';
import { NotFound, ServerError } from 'components/@errors';
import type { GetServerSideProps, NextPage } from 'next';
import { extractIdFromSlug } from 'lib/utils';
import { initializeApollo } from 'lib/apollo';

interface IBookPage {
  id: string;
}

const BookPage: NextPage<IBookPage> = ({ id }) => {
  const { data, error } = useBookPage_EditionQuery({ variables: { id } });
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

export default BookPage;
