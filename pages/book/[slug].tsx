import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/@controls/Link';
import extractIdFromSlug from 'utils/extractIdFromSlug';
import { BookReviews } from 'modules/BookReviews';
import { Edition } from 'modules/Edition';
import { Errors } from 'components/@errors';
import { useBookPage_EditionQuery } from 'generated/graphql';

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const id = extractIdFromSlug(slug);
  const { data, loading, error } = useBookPage_EditionQuery({ variables: { id } });
  const { edition } = data ?? {};

  if (loading) return null;
  if (error) return <Errors.ServerError />;
  if (!edition || id === null) return <Errors.NotFound />;

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

export default withApollo(Book);
