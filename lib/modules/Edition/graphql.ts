import { gql } from '@apollo/client';
import { BY_AUTHORS_FRAGMENT } from 'lib/components/Authors/ByAuthors/graphql';

export const EDITION_FRAGMENT = gql`
  fragment Edition on Edition {
    lang
    title
    cover
    description
    publishedIn
    book {
      id
      ...ByAuthors
    }
  }
  ${BY_AUTHORS_FRAGMENT}
`;
