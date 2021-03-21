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
        publishedIn
        title
        lang
        id
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

  const { editions, publishedIn } = book;
  const { title, description } = editions[0];

  return (
    <div>
      <CustomHead title={title} description={description} />
      <div>
        <b>{title}</b>
        <span> by </span>
        {book.authors?.map(({ fullName, id }, index) => (
          <span key={id}>
            <Link path={`/${ROUTE.author}/${id}`} slug={fullName}>
              {fullName}
            </Link>
            {book.authors.length - 1 === index ? '' : ', '}
          </span>
        ))}
        {publishedIn && <div>First published in {formatDate(publishedIn)}</div>}
        <div className="mt-2">
          {editions.map(edition => (
            <div key={edition.id} className="mb-2">
              <Link path={`/${ROUTE.book}/${edition.id}`} slug={edition.title}>
                {edition.title}
              </Link>
              <div>
                <b>Published in: </b>
                {formatDate(edition.publishedIn)}
              </div>
              <div>
                <b>Edition language: </b>
                {edition.lang}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withApollo(Book);
