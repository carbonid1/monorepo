import { useRouter } from 'next/router';
import { withApollo } from '../../apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NotFound } from '../../components/NotFound';
import Link from 'next/link';
import type { IAuthor, IBook } from '../../types/interfaces';

interface IBookQ extends Pick<IBook, 'id' | 'publishedIn' | 'title'> {
  author?: Pick<IAuthor, 'fullName'>;
}
interface IBookQData {
  book: IBookQ;
}
interface IBookQVars extends Pick<IBook, 'slug'> {}

const BookQ = gql`
  query BookQ($slug: String!) {
    book(slug: $slug) {
      id
      author {
        fullName
      }
      publishedIn
      title
    }
  }
`;

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const { data, loading, error } = useQuery<IBookQData, IBookQVars>(BookQ, { variables: { slug } });
  const { book } = data ?? {};

  if (loading || error) return null;
  if (!book) return <NotFound />;

  return (
    <div>
      <div>
        {book.id}
        {book.title}
        {book.publishedIn}
        {book.author?.fullName}
      </div>
      <Link href="/">Back Home</Link>
    </div>
  );
};

export default withApollo(Book);
