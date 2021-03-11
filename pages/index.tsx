import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from 'apollo/client';
import { ROUTE } from 'consts/routes';
import type { IBook } from 'types/interfaces';
import { BaseError } from 'components/errors/BaseError';
import { Link } from 'components/controls/Link';

interface IBooksQData {
  books: IBook[];
}

const BooksQ = gql`
  query Books {
    books {
      authors {
        fullName
        id
      }
      editions {
        title
      }
      id
    }
  }
`;

const Home: React.FC = () => {
  const { data, error } = useQuery<IBooksQData>(BooksQ);
  const { books = [] } = data ?? {};

  if (error) return <BaseError />;
  return (
    <ul>
      {books.map(({ id, authors, editions }, index) => (
        <li key={id + index}>
          {authors?.map(({ fullName, id }, index) => (
            <span key={id + index}>
              <Link path={`/${ROUTE.author}/${id}`} slug={fullName}>
                {fullName}
              </Link>
              {authors.length - 1 === index ? ': ' : ', '}
            </span>
          ))}
          <Link path={`/${ROUTE.book}/${id}`} slug={editions[0].title}>
            {editions[0].title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default withApollo(Home);
