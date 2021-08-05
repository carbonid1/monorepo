import gql from 'graphql-tag';

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
