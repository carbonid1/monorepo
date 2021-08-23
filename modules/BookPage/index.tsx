import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/@controls/Link';
import { BookReviews } from 'modules/BookReviews';
import { Edition } from 'modules/Edition';
import { useBookPage_EditionQuery } from 'generated/graphql';
import { NotFound, ServerError } from 'components/@errors';
import type { NextPage } from 'next';

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

export default BookPage;
