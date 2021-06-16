import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from 'apollo/client';
import { ROUTE } from 'consts/routes';
import type { IBook } from 'types/interfaces';
import { Link } from 'components/@controls/Link';
import { Authors } from 'components/Authors';
import { Errors } from 'components/@errors';

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
        id
      }
      id
    }
  }
`;

const Home: React.FC = () => {
  const { data, error } = useQuery<IBooksQData>(BooksQ);
  const { books = [] } = data ?? {};

  if (error) return <Errors.ServerError />;
  return (
    <ul>
      {books.map(({ id, authors, editions }, index) => (
        <li key={id + index}>
          <Authors authors={authors} lastAuthorSuffix=": " />
          <Link path={`/${ROUTE.book}/${editions[0].id}`} slug={editions[0].title}>
            {editions[0].title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default withApollo(Home);
