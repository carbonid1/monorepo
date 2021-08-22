import { gql } from '@apollo/client';

gql`
  query IndexPage_books {
    books {
      authors {
        fullName
        id
      }
      editions {
        title
        id
      }
      id
    }
  }
`;
