import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../apollo/client';
import Link from 'next/link';
import { ROUTE } from '../consts/routes';
import type { IBook } from '../types/interfaces';

interface IBooksQData {
  books: Pick<IBook, 'author' | 'slug' | 'title'>[];
}

const BooksQ = gql`
  query Books {
    books {
      author {
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
      {books.map(book => (
        <div key={book.slug}>
          <Link href={`/${ROUTE.book}/${book.slug}`}>
            <a>
              {book.author?.fullName && <b>{book.author.fullName}: </b>}
              {book.title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default withApollo(Home);
