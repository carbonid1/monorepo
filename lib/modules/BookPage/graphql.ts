import { gql } from '@apollo/client';
import { EDITION_QUERY } from '../Edition/graphql';

gql`
  query BookPage_edition($id: ID) {
    edition(id: $id) {
      ...Edition
    }
  }
  ${EDITION_QUERY}
`;
