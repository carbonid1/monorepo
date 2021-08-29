import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
  bio?: Maybe<Scalars['String']>;
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
  publishedIn?: Maybe<Scalars['String']>;
  reviews: Array<Review>;
  title: Scalars['String'];
  cover?: Maybe<Scalars['String']>;
};

export type Mutation = {
  empty?: Maybe<User>;
};

export type Query = {
  author?: Maybe<Author>;
  book?: Maybe<Book>;
  books: Array<Book>;
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

export type User = {
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type ByAuthorsFragment = { authors: Array<{ id: number; fullName: string }> };

export type AuthorsFragment = { authors: Array<{ id: number; fullName: string }> };

export type AuthorPage_AuthorQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AuthorPage_AuthorQuery = {
  author?: Maybe<{
    id: number;
    bio?: Maybe<string>;
    fullName: string;
    imageUrl?: Maybe<string>;
    books: Array<{ id: number; editions: Array<{ title: string; description?: Maybe<string>; id: number }> }>;
  }>;
};

export type BookPage_EditionQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;

export type BookPage_EditionQuery = {
  edition?: Maybe<{
    lang?: Maybe<string>;
    title: string;
    cover?: Maybe<string>;
    description?: Maybe<string>;
    publishedIn?: Maybe<string>;
    book: { id: number; authors: Array<{ id: number; fullName: string }> };
  }>;
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

export type EditionFragment = {
  lang?: Maybe<string>;
  title: string;
  cover?: Maybe<string>;
  description?: Maybe<string>;
  publishedIn?: Maybe<string>;
  book: { id: number; authors: Array<{ id: number; fullName: string }> };
};

export type EditionsPage_BookQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;

export type EditionsPage_BookQuery = {
  book?: Maybe<{
    publishedIn: string;
    editions: Array<{
      description?: Maybe<string>;
      publishedIn?: Maybe<string>;
      title: string;
      lang?: Maybe<string>;
      id: number;
    }>;
    authors: Array<{ id: number; fullName: string }>;
  }>;
};

export type IndexPage_BooksQueryVariables = Exact<{ [key: string]: never }>;

export type IndexPage_BooksQuery = {
  books: Array<{
    id: number;
    editions: Array<{ title: string; id: number }>;
    authors: Array<{ id: number; fullName: string }>;
  }>;
};

export type ReviewPage_ReviewQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;

export type ReviewPage_ReviewQuery = {
  review?: Maybe<{
    body: string;
    edition: { title: string; book: { authors: Array<{ id: number; fullName: string }> } };
  }>;
};

export const AuthorsFragmentDoc = gql`
  fragment Authors on Book {
    authors {
      id
      fullName
    }
  }
`;
export const ByAuthorsFragmentDoc = gql`
  fragment ByAuthors on Book {
    ...Authors
  }
  ${AuthorsFragmentDoc}
`;
export const EditionFragmentDoc = gql`
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
  ${ByAuthorsFragmentDoc}
`;
export const AuthorPage_AuthorDocument = gql`
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

/**
 * __useAuthorPage_AuthorQuery__
 *
 * To run a query within a React component, call `useAuthorPage_AuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorPage_AuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorPage_AuthorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAuthorPage_AuthorQuery(
  baseOptions: Apollo.QueryHookOptions<AuthorPage_AuthorQuery, AuthorPage_AuthorQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AuthorPage_AuthorQuery, AuthorPage_AuthorQueryVariables>(AuthorPage_AuthorDocument, options);
}
export function useAuthorPage_AuthorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AuthorPage_AuthorQuery, AuthorPage_AuthorQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AuthorPage_AuthorQuery, AuthorPage_AuthorQueryVariables>(
    AuthorPage_AuthorDocument,
    options,
  );
}
export type AuthorPage_AuthorQueryHookResult = ReturnType<typeof useAuthorPage_AuthorQuery>;
export type AuthorPage_AuthorLazyQueryHookResult = ReturnType<typeof useAuthorPage_AuthorLazyQuery>;
export type AuthorPage_AuthorQueryResult = Apollo.QueryResult<AuthorPage_AuthorQuery, AuthorPage_AuthorQueryVariables>;
export const BookPage_EditionDocument = gql`
  query BookPage_edition($id: ID) {
    edition(id: $id) {
      ...Edition
    }
  }
  ${EditionFragmentDoc}
`;

/**
 * __useBookPage_EditionQuery__
 *
 * To run a query within a React component, call `useBookPage_EditionQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookPage_EditionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookPage_EditionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookPage_EditionQuery(
  baseOptions?: Apollo.QueryHookOptions<BookPage_EditionQuery, BookPage_EditionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookPage_EditionQuery, BookPage_EditionQueryVariables>(BookPage_EditionDocument, options);
}
export function useBookPage_EditionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookPage_EditionQuery, BookPage_EditionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookPage_EditionQuery, BookPage_EditionQueryVariables>(BookPage_EditionDocument, options);
}
export type BookPage_EditionQueryHookResult = ReturnType<typeof useBookPage_EditionQuery>;
export type BookPage_EditionLazyQueryHookResult = ReturnType<typeof useBookPage_EditionLazyQuery>;
export type BookPage_EditionQueryResult = Apollo.QueryResult<BookPage_EditionQuery, BookPage_EditionQueryVariables>;
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
export const EditionsPage_BookDocument = gql`
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
  ${ByAuthorsFragmentDoc}
`;

/**
 * __useEditionsPage_BookQuery__
 *
 * To run a query within a React component, call `useEditionsPage_BookQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditionsPage_BookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditionsPage_BookQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditionsPage_BookQuery(
  baseOptions?: Apollo.QueryHookOptions<EditionsPage_BookQuery, EditionsPage_BookQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EditionsPage_BookQuery, EditionsPage_BookQueryVariables>(EditionsPage_BookDocument, options);
}
export function useEditionsPage_BookLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EditionsPage_BookQuery, EditionsPage_BookQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EditionsPage_BookQuery, EditionsPage_BookQueryVariables>(
    EditionsPage_BookDocument,
    options,
  );
}
export type EditionsPage_BookQueryHookResult = ReturnType<typeof useEditionsPage_BookQuery>;
export type EditionsPage_BookLazyQueryHookResult = ReturnType<typeof useEditionsPage_BookLazyQuery>;
export type EditionsPage_BookQueryResult = Apollo.QueryResult<EditionsPage_BookQuery, EditionsPage_BookQueryVariables>;
export const IndexPage_BooksDocument = gql`
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
  ${AuthorsFragmentDoc}
`;

/**
 * __useIndexPage_BooksQuery__
 *
 * To run a query within a React component, call `useIndexPage_BooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexPage_BooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexPage_BooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useIndexPage_BooksQuery(
  baseOptions?: Apollo.QueryHookOptions<IndexPage_BooksQuery, IndexPage_BooksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IndexPage_BooksQuery, IndexPage_BooksQueryVariables>(IndexPage_BooksDocument, options);
}
export function useIndexPage_BooksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IndexPage_BooksQuery, IndexPage_BooksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IndexPage_BooksQuery, IndexPage_BooksQueryVariables>(IndexPage_BooksDocument, options);
}
export type IndexPage_BooksQueryHookResult = ReturnType<typeof useIndexPage_BooksQuery>;
export type IndexPage_BooksLazyQueryHookResult = ReturnType<typeof useIndexPage_BooksLazyQuery>;
export type IndexPage_BooksQueryResult = Apollo.QueryResult<IndexPage_BooksQuery, IndexPage_BooksQueryVariables>;
export const ReviewPage_ReviewDocument = gql`
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
  ${AuthorsFragmentDoc}
`;

/**
 * __useReviewPage_ReviewQuery__
 *
 * To run a query within a React component, call `useReviewPage_ReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewPage_ReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewPage_ReviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReviewPage_ReviewQuery(
  baseOptions?: Apollo.QueryHookOptions<ReviewPage_ReviewQuery, ReviewPage_ReviewQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReviewPage_ReviewQuery, ReviewPage_ReviewQueryVariables>(ReviewPage_ReviewDocument, options);
}
export function useReviewPage_ReviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ReviewPage_ReviewQuery, ReviewPage_ReviewQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReviewPage_ReviewQuery, ReviewPage_ReviewQueryVariables>(
    ReviewPage_ReviewDocument,
    options,
  );
}
export type ReviewPage_ReviewQueryHookResult = ReturnType<typeof useReviewPage_ReviewQuery>;
export type ReviewPage_ReviewLazyQueryHookResult = ReturnType<typeof useReviewPage_ReviewLazyQuery>;
export type ReviewPage_ReviewQueryResult = Apollo.QueryResult<ReviewPage_ReviewQuery, ReviewPage_ReviewQueryVariables>;
