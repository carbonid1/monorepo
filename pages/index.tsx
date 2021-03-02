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
        slug
      }
      slug
      title
    }
  }
`;

const Home: React.FC = () => {
  const { data, error } = useQuery<IBooksQData>(BooksQ);
  const { books = [] } = data ?? {};

  if (error) return <BaseError />;

  return (
    <ul>
      {books.map(({ slug, authors, title }, index) => (
        <li key={slug + index}>
          {authors?.map(({ fullName, slug }, index) => (
            <span key={slug + index}>
              <Link href={`/${ROUTE.author}/${slug}`}>{fullName}</Link>
              {authors.length - 1 === index ? ': ' : ', '}
            </span>
          ))}
          <Link href={`/${ROUTE.book}/${slug}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default withApollo(Home);
