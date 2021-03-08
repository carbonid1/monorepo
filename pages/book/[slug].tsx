import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NotFound } from 'components/errors/NotFound';
import type { IBook } from 'types/interfaces';
import { BaseError } from 'components/errors/BaseError';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/controls/Link';
import extractIdFromSlug from 'utils/extractIdFromSlug';

interface IBookQData {
  book: IBook;
}
interface IBookQVars {
  id: number | null;
}

const BookQ = gql`
  query BookQ($id: ID) {
    book(id: $id) {
      authors {
        fullName
        id
      }
      description
      publishedIn
      title
    }
  }
`;

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const id = extractIdFromSlug(slug);
  const { data, loading, error } = useQuery<IBookQData, IBookQVars>(BookQ, { variables: { id } });
  const { book } = data ?? {};

  if (loading) return null;
  if (error) return <BaseError />;
  if (!book) return <NotFound />;

  return (
    <div>
      <CustomHead title={book.title} description={book.description} />
      <div>
        <div>
          <b>Title: </b>
          {book.title}
        </div>
        {book.publishedIn && (
          <div>
            <b>Date Published: </b>
            {book.publishedIn}
          </div>
        )}
        {book.authors?.map(({ fullName, id }, index) => (
          <div key={id}>
            <Link path={`/${ROUTE.author}/${id}`} slug={fullName}>
              {fullName}
            </Link>
            {book.authors.length - 1 === index ? '' : ', '}
          </div>
        ))}
        {book.description && <div>{book.description}</div>}
      </div>
    </div>
  );
};

export default withApollo(Book);
