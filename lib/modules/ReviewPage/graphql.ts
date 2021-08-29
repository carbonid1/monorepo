import { gql } from '@apollo/client';
import { AUTHORS_FRAGMENT } from 'lib/components/Authors/graphql';

gql`
  query ReviewPage_review($id: ID) {
    review(id: $id) {
      body
      edition {
        title
        book {
          ...Authors
        }
      }
    }
  }
  ${AUTHORS_FRAGMENT}
`;
