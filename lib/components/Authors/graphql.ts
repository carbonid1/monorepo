import { gql } from '@apollo/client';

export const AUTHORS_FRAGMENT = gql`
  fragment Authors on Book {
    authors {
      id
      fullName
    }
  }
`;
