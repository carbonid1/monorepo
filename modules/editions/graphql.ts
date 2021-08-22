import { gql } from '@apollo/client';

gql`
  query EditionsPage_book($id: ID) {
    book(id: $id) {
      authors {
        fullName
        id
      }
      editions {
        description
        publishedIn
        title
        lang
        id
      }
      publishedIn
    }
  }
`;
