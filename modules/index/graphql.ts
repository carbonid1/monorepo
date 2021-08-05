import gql from 'graphql-tag';

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
