import { gql } from '@apollo/client';
import { BY_AUTHORS_QUERY } from 'lib/components/Authors/ByAuthors/graphql';

export const EDITION_QUERY = gql`
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
  ${BY_AUTHORS_QUERY}
`;
