import { gql } from '@apollo/client';

gql`
  query IndexPage_books {
    books {
      id
      editions {
        id
        title
        cover
      }
    }
  }
`;
