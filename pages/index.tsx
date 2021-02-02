import { withApollo } from '../apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const BookQ = gql`
  query BookQ($bookId: Int!) {
    book(bookId: $bookId) {
      id
      title
      publishedIn
      author
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(BookQ, {
    variables: { bookId: 1 },
  });

  if (loading) return '...loading';
  if (error) return 'error';

  return (
    <div>
      {data.book.id}
      {data.book.title}
      {data.book.publishedIn}
      {data.book.author}
    </div>
  );
};

export default withApollo(Home);
