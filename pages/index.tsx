import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../apollo/client';
import Link from 'next/link';
import { ROUTE } from '../consts/routes';

const BooksQ = gql`
  query Books {
    books {
      slug
      title
      author
    }
  }
`;

const Home: React.FC = () => {
  const { data } = useQuery(BooksQ);
  const { books = [] } = data ?? {};

  return (
    <div>
      {books.map((book: any) => (
        <div>
          <Link key={book.slug} href={`${ROUTE.book}/${book.slug}`}>
            <a>
              <b>{book.author}: </b>
              {book.title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default withApollo(Home);
