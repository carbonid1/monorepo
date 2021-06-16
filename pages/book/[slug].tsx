import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import { gql, useQuery } from '@apollo/react-hooks';
import type { IEdition } from 'types/interfaces';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/@controls/Link';
import extractIdFromSlug from 'utils/extractIdFromSlug';
import { BookReviews } from 'modules/BookReviews';
import { Edition } from 'modules/Edition';
import { Errors } from 'components/@errors';

interface IEditionQData {
  edition: IEdition;
}
interface IEditionQVars {
  id: number | null;
}

const EditionQ = gql`
  query EditionQ($id: ID) {
    edition(id: $id) {
      lang
      cover
      title
      description
      publishedIn
      book {
        id
        authors {
          fullName
          id
        }
      }
    }
  }
`;

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const id = extractIdFromSlug(slug);
  const { data, loading, error } = useQuery<IEditionQData, IEditionQVars>(EditionQ, { variables: { id } });
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
        <BookReviews bookId={book.id} editionId={id} />
      </div>
    </div>
  );
};

export default withApollo(Book);
