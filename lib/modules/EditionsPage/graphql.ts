import { gql } from '@apollo/client';
import { BY_AUTHORS_FRAGMENT } from 'lib/components/Authors/ByAuthors/graphql';

gql`
  query EditionsPage_book($id: ID) {
    book(id: $id) {
      ...ByAuthors
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
  ${BY_AUTHORS_FRAGMENT}
`;
