import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../apollo/client';
import Link from 'next/link';
import { ROUTE } from '../consts/routes';
import type { IBook } from '../types/interfaces';

interface IBooksQData {
  books: IBook[];
}

const BooksQ = gql`
  query Books {
    books {
      authors {
        fullName
      }
      slug
      title
    }
  }
`;

const Home: React.FC = () => {
  const { data } = useQuery<IBooksQData>(BooksQ);
  const { books = [] } = data ?? {};

  return (
    <div>
      {books.map(({ slug, authors, title }) => (
        <div key={slug}>
          <Link href={`/${ROUTE.book}/${slug}`}>
            <a>
              {!!authors.length && <b>{authors.map(({ fullName }) => fullName).join(', ')}: </b>}
              {title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default withApollo(Home);
