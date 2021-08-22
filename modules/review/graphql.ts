import { gql } from '@apollo/client';

gql`
  query ReviewPage_review($id: ID) {
    review(id: $id) {
      body
      edition {
        title
        book {
          authors {
            fullName
            id
          }
        }
      }
    }
  }
`;
