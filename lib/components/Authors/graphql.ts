import { gql } from '@apollo/client';

export const AUTHORS_QUERY = gql`
  fragment Authors on Book {
    authors {
      id
      fullName
    }
  }
`;
