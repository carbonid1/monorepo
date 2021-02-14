import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from 'apollo/client';
import Link from 'next/link';
import { ROUTE } from 'consts/routes';
import type { IBook } from 'types/interfaces';
import { BaseError } from 'components/errors/BaseError';

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
      {books.map(({ slug, authors, title }) => (
        <li key={slug}>
          {authors?.map(({ fullName, slug }, index) => (
            <>
              <Link href={`/${ROUTE.author}/${slug}`} key={slug + index}>
                {fullName}
              </Link>
              {authors.length - 1 === index ? ': ' : ', '}
            </>
          ))}
          <Link href={`/${ROUTE.book}/${slug}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default withApollo(Home);
