import gql from 'graphql-tag';

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
