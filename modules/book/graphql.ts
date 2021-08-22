import { gql } from '@apollo/client';

gql`
  query BookPage_edition($id: ID) {
    edition(id: $id) {
      lang
      cover
      title
      description
      publishedIn
      book {
        id
        authors {
          fullName
          id
        }
      }
    }
  }
`;
