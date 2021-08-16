import { gql } from 'graphql-tag';

gql`
  query AuthorPage_author($id: ID!) {
    author(id: $id) {
      id
      bio
      fullName
      imageUrl
      books {
        editions {
          title
          description
          id
        }
        id
      }
    }
  }
`;
