import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NotFound } from 'components/errors/NotFound';
import type { IEdition } from 'types/interfaces';
import { BaseError } from 'components/errors/BaseError';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/controls/Link';
import extractIdFromSlug from 'utils/extractIdFromSlug';
import formatDate from 'utils/formatDate';

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
      }
      description
      title
      publishedIn
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
  if (!edition) return <NotFound />;

  const { title, description, publishedIn, book } = edition;

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
            {formatDate(publishedIn)}
          </div>
        )}
        {book.authors?.map(({ fullName, id }, index) => (
          <span key={id}>
            <Link path={`/${ROUTE.author}/${id}`} slug={fullName}>
              {fullName}
            </Link>
            {book.authors.length - 1 === index ? '' : ', '}
          </span>
        ))}
        {description && <div>{description}</div>}
      </div>
    </div>
  );
};

export default withApollo(Book);
