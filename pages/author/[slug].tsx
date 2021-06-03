import { useRouter } from 'next/router';
import { withApollo } from 'apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NotFound } from 'components/@errors/NotFound';
import type { IAuthor } from 'types/interfaces';
import { BaseError } from 'components/@errors/BaseError';
import { CustomHead } from 'components/CustomHead';
import { ROUTE } from 'consts/routes';
import { Link } from 'components/@controls/Link';
import extractIdFromSlug from 'utils/extractIdFromSlug';
import { Paragraph } from 'components/@typography/Paragraph';

interface IAuthorQData {
  author: IAuthor;
}
interface IAuthorQVars {
  id: number | null;
}

const AuthorQ = gql`
  query AuthorQ($id: ID) {
    author(id: $id) {
      fullName
      id
      books {
        editions {
          title
          description
          id
        }
        id
      }
    }
  }
`;

const Book: React.FC = () => {
  const slug = useRouter().query.slug as string;
  const id = extractIdFromSlug(slug);
  const { data, loading, error } = useQuery<IAuthorQData, IAuthorQVars>(AuthorQ, { variables: { id } });
  const { author } = data ?? {};

  if (loading) return null;
  if (error) return <BaseError />;
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
          {books.map(({ editions, id }, index) => {
            const { title, description, id: editionId } = editions[0];
            return (
              <li key={id + index}>
                <Link path={`/${ROUTE.book}/${editionId}`} slug={title}>
                  {title}
                </Link>
                <Paragraph ellipsis={{ rows: 5, expandable: false }}>{description}</Paragraph>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default withApollo(Book);
