import { gql } from '@apollo/client';
import { AUTHORS_FRAGMENT } from '../graphql';

export const BY_AUTHORS_FRAGMENT = gql`
  fragment ByAuthors on Book {
    ...Authors
  }
  ${AUTHORS_FRAGMENT}
`;
