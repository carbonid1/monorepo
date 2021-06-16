import gql from 'graphql-tag';
import type { IAuthor } from 'types/interfaces';
import { useQuery } from '@apollo/react-hooks';

interface IAuthorQData {
  author: IAuthor;
}
interface IAuthorQVars {
  id: number | null;
}

const AuthorQ = gql`
  query AuthorQ($id: ID) {
    author(id: $id) {
      id
      fullName
      imageUrl
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

const useAuthorQuery = (variables: IAuthorQVars) => useQuery<IAuthorQData, IAuthorQVars>(AuthorQ, { variables });

export default {
  useAuthorQuery,
};
