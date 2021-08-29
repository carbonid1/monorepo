import { gql } from '@apollo/client';

gql`
  query BookReviews_reviews($bookId: ID, $editionId: ID, $lang: String) {
    reviews(lang: $lang, bookId: $bookId, editionId: $editionId) {
      body
      lang
      id
      createdAt
    }
  }
`;

gql`
  query BookReviews_langReviews($bookId: ID, $editionId: ID) {
    reviews(bookId: $bookId, editionId: $editionId) {
      lang
    }
  }
`;
