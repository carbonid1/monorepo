import { gql } from '@apollo/client';

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
