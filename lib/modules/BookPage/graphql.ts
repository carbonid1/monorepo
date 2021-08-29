import { gql } from '@apollo/client';
import { EDITION_FRAGMENT } from '../Edition/graphql';

gql`
  query BookPage_edition($id: ID) {
    edition(id: $id) {
      ...Edition
    }
  }
  ${EDITION_FRAGMENT}
`;
