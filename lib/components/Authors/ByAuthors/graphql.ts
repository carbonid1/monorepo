import { gql } from '@apollo/client';
import { AUTHORS_QUERY } from '../graphql';

export const BY_AUTHORS_QUERY = gql`
  fragment ByAuthors on Book {
    ...Authors
  }
  ${AUTHORS_QUERY}
`;
