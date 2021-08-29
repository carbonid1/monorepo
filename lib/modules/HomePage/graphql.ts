import { gql } from '@apollo/client';
import { AUTHORS_FRAGMENT } from 'lib/components/Authors/graphql';

gql`
  query IndexPage_books {
    books {
      ...Authors
      editions {
        title
        id
      }
      id
    }
  }
  ${AUTHORS_FRAGMENT}
`;
