import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NotFound } from 'components/errors/NotFound';
import Link from 'next/link';
import type { IAuthor } from 'types/interfaces';
import { GenericError } from 'components/errors/GenericError';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';

interface IAuthorQData {
  author: IAuthor;
}
interface IAuthorQVars extends Pick<IAuthor, 'slug'> {}

const AuthorQ = gql`
  query AuthorQ($slug: String!) {
    author(slug: $slug) {
      fullName
      slug
      books {
        title
        description
        slug
      }
    }
  }
`;

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const { data, loading, error } = useQuery<IAuthorQData, IAuthorQVars>(AuthorQ, { variables: { slug } });
  const { author } = data ?? {};

  if (loading) return null;
  if (error) return <GenericError />;
  if (!author) return <NotFound />;

  const { fullName, books } = author;

  return (
    <div>
      <CustomHead title={fullName} />
      <div>
        <div>
          <b>Name: </b>
          {fullName}
        </div>
        <ul>
          {books.map(book => (
            <li>
              <Link href={`/${ROUTE.book}/${book.slug}`}>
                <a>{book.title}</a>
              </Link>
              <div>{book.description}</div>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/">Back Home</Link>
    </div>
  );
};

export default withApollo(Book);
