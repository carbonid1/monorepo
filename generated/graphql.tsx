import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client'
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
};

export type Author = {
  id: Scalars['Int'];
  fullName: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  books: Array<Book>;
};

export type Book = {
  authors: Array<Author>;
  editions: Array<Edition>;
  id: Scalars['Int'];
  publishedIn: Scalars['String'];
};

export type Edition = {
  book: Book;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lang?: Maybe<Scalars['String']>;
  publishedIn: Scalars['String'];
  reviews: Array<Review>;
  title: Scalars['String'];
  cover?: Maybe<Scalars['String']>;
};

export type Query = {
  author?: Maybe<Author>;
  book?: Maybe<Book>;
  books: Array<Maybe<Book>>;
  edition?: Maybe<Edition>;
  review?: Maybe<Review>;
  reviews: Array<Review>;
};

export type QueryAuthorArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryBookArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryEditionArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryReviewArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryReviewsArgs = {
  bookId?: Maybe<Scalars['ID']>;
  editionId?: Maybe<Scalars['ID']>;
  lang?: Maybe<Scalars['String']>;
};

export type Review = {
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  body: Scalars['String'];
  edition: Edition;
  lang?: Maybe<Scalars['String']>;
};

export type ReviewEditionArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type BookReviews_ReviewsQueryVariables = Exact<{
  bookId?: Maybe<Scalars['ID']>;
  editionId?: Maybe<Scalars['ID']>;
  lang?: Maybe<Scalars['String']>;
}>;

export type BookReviews_ReviewsQuery = {
  reviews: Array<{ body: string; lang?: Maybe<string>; id: number; createdAt: string }>;
};

export type BookReviews_LangReviewsQueryVariables = Exact<{
  bookId?: Maybe<Scalars['ID']>;
  editionId?: Maybe<Scalars['ID']>;
}>;

export type BookReviews_LangReviewsQuery = { reviews: Array<{ lang?: Maybe<string> }> };

export type AuthorQQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;

export type AuthorQQuery = {
  author?: Maybe<{
    id: number;
    fullName: string;
    imageUrl?: Maybe<string>;
    books: Array<{ id: number; editions: Array<{ title: string; description?: Maybe<string>; id: number }> }>;
  }>;
};

export const BookReviews_ReviewsDocument = gql`
  query BookReviews_reviews($bookId: ID, $editionId: ID, $lang: String) {
    reviews(lang: $lang, bookId: $bookId, editionId: $editionId) {
      body
      lang
      id
      createdAt
    }
  }
`;

/**
 * __useBookReviews_ReviewsQuery__
 *
 * To run a query within a React component, call `useBookReviews_ReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookReviews_ReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookReviews_ReviewsQuery({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      editionId: // value for 'editionId'
 *      lang: // value for 'lang'
 *   },
 * });
 */
export function useBookReviews_ReviewsQuery(
  baseOptions?: Apollo.QueryHookOptions<BookReviews_ReviewsQuery, BookReviews_ReviewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookReviews_ReviewsQuery, BookReviews_ReviewsQueryVariables>(
    BookReviews_ReviewsDocument,
    options,
  );
}
export function useBookReviews_ReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookReviews_ReviewsQuery, BookReviews_ReviewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookReviews_ReviewsQuery, BookReviews_ReviewsQueryVariables>(
    BookReviews_ReviewsDocument,
    options,
  );
}
export type BookReviews_ReviewsQueryHookResult = ReturnType<typeof useBookReviews_ReviewsQuery>;
export type BookReviews_ReviewsLazyQueryHookResult = ReturnType<typeof useBookReviews_ReviewsLazyQuery>;
export type BookReviews_ReviewsQueryResult = Apollo.QueryResult<
  BookReviews_ReviewsQuery,
  BookReviews_ReviewsQueryVariables
>;
export const BookReviews_LangReviewsDocument = gql`
  query BookReviews_langReviews($bookId: ID, $editionId: ID) {
    reviews(bookId: $bookId, editionId: $editionId) {
      lang
    }
  }
`;

/**
 * __useBookReviews_LangReviewsQuery__
 *
 * To run a query within a React component, call `useBookReviews_LangReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookReviews_LangReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookReviews_LangReviewsQuery({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      editionId: // value for 'editionId'
 *   },
 * });
 */
export function useBookReviews_LangReviewsQuery(
  baseOptions?: Apollo.QueryHookOptions<BookReviews_LangReviewsQuery, BookReviews_LangReviewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookReviews_LangReviewsQuery, BookReviews_LangReviewsQueryVariables>(
    BookReviews_LangReviewsDocument,
    options,
  );
}
export function useBookReviews_LangReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookReviews_LangReviewsQuery, BookReviews_LangReviewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookReviews_LangReviewsQuery, BookReviews_LangReviewsQueryVariables>(
    BookReviews_LangReviewsDocument,
    options,
  );
}
export type BookReviews_LangReviewsQueryHookResult = ReturnType<typeof useBookReviews_LangReviewsQuery>;
export type BookReviews_LangReviewsLazyQueryHookResult = ReturnType<typeof useBookReviews_LangReviewsLazyQuery>;
export type BookReviews_LangReviewsQueryResult = Apollo.QueryResult<
  BookReviews_LangReviewsQuery,
  BookReviews_LangReviewsQueryVariables
>;
export const AuthorQDocument = gql`
  query AuthorQ($id: ID) {
    author(id: $id) {
      id
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

/**
 * __useAuthorQQuery__
 *
 * To run a query within a React component, call `useAuthorQQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorQQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorQQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAuthorQQuery(baseOptions?: Apollo.QueryHookOptions<AuthorQQuery, AuthorQQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AuthorQQuery, AuthorQQueryVariables>(AuthorQDocument, options);
}
export function useAuthorQLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthorQQuery, AuthorQQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AuthorQQuery, AuthorQQueryVariables>(AuthorQDocument, options);
}
export type AuthorQQueryHookResult = ReturnType<typeof useAuthorQQuery>;
export type AuthorQLazyQueryHookResult = ReturnType<typeof useAuthorQLazyQuery>;
export type AuthorQQueryResult = Apollo.QueryResult<AuthorQQuery, AuthorQQueryVariables>;
