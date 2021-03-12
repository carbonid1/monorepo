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
import formatDate from 'utils/formatDate';

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
      editions {
        description
        publishedIn
        title
      }
      publishedIn
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

  const { editions, publishedIn, authors } = book;
  const { title, description } = editions[0];

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
        {authors?.map(({ fullName, id }, index) => (
          <span key={id}>
            <Link path={`/${ROUTE.author}/${id}`} slug={fullName}>
              {fullName}
            </Link>
            {authors.length - 1 === index ? '' : ', '}
          </span>
        ))}
        {description && <div>{description}</div>}
      </div>
    </div>
  );
};

export default withApollo(Book);
