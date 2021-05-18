import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import { gql, useQuery } from '@apollo/react-hooks';
import { NotFound } from 'components/@errors/NotFound';
import type { IEdition } from 'types/interfaces';
import { BaseError } from 'components/@errors/BaseError';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/@controls/Link';
import extractIdFromSlug from 'utils/extractIdFromSlug';
import { Authors } from 'components/Authors';
import { BookReviews } from 'modules/BookReviews';

interface IEditionQData {
  edition: IEdition;
}
interface IEditionQVars {
  id: number | null;
}

const EditionQ = gql`
  query EditionQ($id: ID) {
    edition(id: $id) {
      book {
        authors {
          fullName
          id
        }
        editions {
          title
          reviews {
            body
            lang
            id
            createdAt
          }
        }
        id
      }
      description
      lang
      publishedIn
      title
    }
  }
`;

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const id = extractIdFromSlug(slug);
  const { data, loading, error } = useQuery<IEditionQData, IEditionQVars>(EditionQ, { variables: { id } });
  const { edition } = data ?? {};

  if (loading) return null;
  if (error) return <BaseError />;
  if (!edition || id === null) return <NotFound />;

  const { title, description, publishedIn, book, lang } = edition;

  return (
    <div>
      <CustomHead title={title} description={description} />
      <div>
        <div>
          <b>Title: </b>
          {title}
        </div>
        {publishedIn && (
          <div>
            <b>Date Published: </b>
            {publishedIn}
          </div>
        )}
        <div>
          <b>Edition Language: </b>
          {lang}
        </div>
        <Authors authors={book.authors} />
        {description && <div>{description}</div>}
        <Link path={`/${ROUTE.editions}/${book.id}`} slug={book.editions[0].title}>
          All Editions
        </Link>
        <BookReviews bookId={book.id} editionId={id} />
      </div>
    </div>
  );
};

export default withApollo(Book);
