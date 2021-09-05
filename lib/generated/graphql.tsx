import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null | undefined;
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
  bio?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  fullName: Scalars['String'];
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

export type AuthorPageAuthorVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AuthorPageAuthor = {
  author?: Maybe<{
    id: number;
    bio?: Maybe<string>;
    fullName: string;
    imageUrl?: Maybe<string>;
    books: Array<{ id: number; editions: Array<{ title: string; description?: Maybe<string>; id: number }> }>;
  }>;
};

export type BookPageEditionVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;

export type BookPageEdition = {
  edition?: Maybe<{
    lang?: Maybe<string>;
    title: string;
    cover?: Maybe<string>;
    description?: Maybe<string>;
    publishedIn?: Maybe<string>;
    book: { id: number; authors: Array<{ id: number; fullName: string }> };
  }>;
};

export type BookReviewsVariables = Exact<{
  bookId?: Maybe<Scalars['ID']>;
  editionId?: Maybe<Scalars['ID']>;
  lang?: Maybe<Scalars['String']>;
}>;

export type BookReviews = { reviews: Array<{ id: number; body: string; lang?: Maybe<string>; createdAt: string }> };

export type BookReviewsLanguagesVariables = Exact<{
  bookId?: Maybe<Scalars['ID']>;
  editionId?: Maybe<Scalars['ID']>;
}>;

export type BookReviewsLanguages = { reviews: Array<{ lang?: Maybe<string> }> };

export type EditionFragment = {
  lang?: Maybe<string>;
  title: string;
  cover?: Maybe<string>;
  description?: Maybe<string>;
  publishedIn?: Maybe<string>;
  book: { id: number; authors: Array<{ id: number; fullName: string }> };
};

export type EditionsPageBookVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;

export type EditionsPageBook = {
  book?: Maybe<{
    publishedIn: string;
    editions: Array<{
      id: number;
      lang?: Maybe<string>;
      title: string;
      description?: Maybe<string>;
      publishedIn?: Maybe<string>;
    }>;
    authors: Array<{ id: number; fullName: string }>;
  }>;
};

export type IndexPageBooksVariables = Exact<{ [key: string]: never }>;

export type IndexPageBooks = {
  books: Array<{ id: number; editions: Array<{ id: number; title: string; cover?: Maybe<string> }> }>;
};

export type ReviewPageReviewVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;

export type ReviewPageReview = {
  review?: Maybe<{
    body: string;
    edition: { title: string; book: { authors: Array<{ id: number; fullName: string }> } };
  }>;
};

export const AuthorsFragment = gql`
  fragment AuthorsFragment on Book {
    authors {
      id
      fullName
    }
  }
`;
export const ByAuthorsFragment = gql`
  fragment ByAuthorsFragment on Book {
    ...AuthorsFragment
  }
  ${AuthorsFragment}
`;
export const EditionFragment = gql`
  fragment EditionFragment on Edition {
    lang
    title
    cover
    description
    publishedIn
    book {
      id
      ...ByAuthorsFragment
    }
  }
  ${ByAuthorsFragment}
`;
export const AuthorPageAuthorDocument = gql`
  query AuthorPageAuthor($id: ID!) {
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
 * __useAuthorPageAuthor__
 *
 * To run a query within a React component, call `useAuthorPageAuthor` and pass it any options that fit your needs.
 * When your component renders, `useAuthorPageAuthor` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorPageAuthor({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAuthorPageAuthor(baseOptions: Apollo.QueryHookOptions<AuthorPageAuthor, AuthorPageAuthorVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AuthorPageAuthor, AuthorPageAuthorVariables>(AuthorPageAuthorDocument, options);
}
export function useAuthorPageAuthorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AuthorPageAuthor, AuthorPageAuthorVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AuthorPageAuthor, AuthorPageAuthorVariables>(AuthorPageAuthorDocument, options);
}
export type AuthorPageAuthorHookResult = ReturnType<typeof useAuthorPageAuthor>;
export type AuthorPageAuthorLazyQueryHookResult = ReturnType<typeof useAuthorPageAuthorLazyQuery>;
export type AuthorPageAuthorQueryResult = Apollo.QueryResult<AuthorPageAuthor, AuthorPageAuthorVariables>;
export const BookPageEditionDocument = gql`
  query BookPageEdition($id: ID) {
    edition(id: $id) {
      ...EditionFragment
    }
  }
  ${EditionFragment}
`;

/**
 * __useBookPageEdition__
 *
 * To run a query within a React component, call `useBookPageEdition` and pass it any options that fit your needs.
 * When your component renders, `useBookPageEdition` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookPageEdition({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookPageEdition(baseOptions?: Apollo.QueryHookOptions<BookPageEdition, BookPageEditionVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookPageEdition, BookPageEditionVariables>(BookPageEditionDocument, options);
}
export function useBookPageEditionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookPageEdition, BookPageEditionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookPageEdition, BookPageEditionVariables>(BookPageEditionDocument, options);
}
export type BookPageEditionHookResult = ReturnType<typeof useBookPageEdition>;
export type BookPageEditionLazyQueryHookResult = ReturnType<typeof useBookPageEditionLazyQuery>;
export type BookPageEditionQueryResult = Apollo.QueryResult<BookPageEdition, BookPageEditionVariables>;
export const BookReviewsDocument = gql`
  query BookReviews($bookId: ID, $editionId: ID, $lang: String) {
    reviews(lang: $lang, bookId: $bookId, editionId: $editionId) {
      id
      body
      lang
      createdAt
    }
  }
`;

/**
 * __useBookReviews__
 *
 * To run a query within a React component, call `useBookReviews` and pass it any options that fit your needs.
 * When your component renders, `useBookReviews` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookReviews({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      editionId: // value for 'editionId'
 *      lang: // value for 'lang'
 *   },
 * });
 */
export function useBookReviews(baseOptions?: Apollo.QueryHookOptions<BookReviews, BookReviewsVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookReviews, BookReviewsVariables>(BookReviewsDocument, options);
}
export function useBookReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookReviews, BookReviewsVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookReviews, BookReviewsVariables>(BookReviewsDocument, options);
}
export type BookReviewsHookResult = ReturnType<typeof useBookReviews>;
export type BookReviewsLazyQueryHookResult = ReturnType<typeof useBookReviewsLazyQuery>;
export type BookReviewsQueryResult = Apollo.QueryResult<BookReviews, BookReviewsVariables>;
export const BookReviewsLanguagesDocument = gql`
  query BookReviewsLanguages($bookId: ID, $editionId: ID) {
    reviews(bookId: $bookId, editionId: $editionId) {
      lang
    }
  }
`;

/**
 * __useBookReviewsLanguages__
 *
 * To run a query within a React component, call `useBookReviewsLanguages` and pass it any options that fit your needs.
 * When your component renders, `useBookReviewsLanguages` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookReviewsLanguages({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      editionId: // value for 'editionId'
 *   },
 * });
 */
export function useBookReviewsLanguages(
  baseOptions?: Apollo.QueryHookOptions<BookReviewsLanguages, BookReviewsLanguagesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookReviewsLanguages, BookReviewsLanguagesVariables>(BookReviewsLanguagesDocument, options);
}
export function useBookReviewsLanguagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookReviewsLanguages, BookReviewsLanguagesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookReviewsLanguages, BookReviewsLanguagesVariables>(
    BookReviewsLanguagesDocument,
    options,
  );
}
export type BookReviewsLanguagesHookResult = ReturnType<typeof useBookReviewsLanguages>;
export type BookReviewsLanguagesLazyQueryHookResult = ReturnType<typeof useBookReviewsLanguagesLazyQuery>;
export type BookReviewsLanguagesQueryResult = Apollo.QueryResult<BookReviewsLanguages, BookReviewsLanguagesVariables>;
export const EditionsPageBookDocument = gql`
  query EditionsPageBook($id: ID) {
    book(id: $id) {
      ...ByAuthorsFragment
      editions {
        id
        lang
        title
        description
        publishedIn
      }
      publishedIn
    }
  }
  ${ByAuthorsFragment}
`;

/**
 * __useEditionsPageBook__
 *
 * To run a query within a React component, call `useEditionsPageBook` and pass it any options that fit your needs.
 * When your component renders, `useEditionsPageBook` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditionsPageBook({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditionsPageBook(
  baseOptions?: Apollo.QueryHookOptions<EditionsPageBook, EditionsPageBookVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EditionsPageBook, EditionsPageBookVariables>(EditionsPageBookDocument, options);
}
export function useEditionsPageBookLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EditionsPageBook, EditionsPageBookVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EditionsPageBook, EditionsPageBookVariables>(EditionsPageBookDocument, options);
}
export type EditionsPageBookHookResult = ReturnType<typeof useEditionsPageBook>;
export type EditionsPageBookLazyQueryHookResult = ReturnType<typeof useEditionsPageBookLazyQuery>;
export type EditionsPageBookQueryResult = Apollo.QueryResult<EditionsPageBook, EditionsPageBookVariables>;
export const IndexPageBooksDocument = gql`
  query IndexPageBooks {
    books {
      id
      editions {
        id
        title
        cover
      }
    }
  }
`;

/**
 * __useIndexPageBooks__
 *
 * To run a query within a React component, call `useIndexPageBooks` and pass it any options that fit your needs.
 * When your component renders, `useIndexPageBooks` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexPageBooks({
 *   variables: {
 *   },
 * });
 */
export function useIndexPageBooks(baseOptions?: Apollo.QueryHookOptions<IndexPageBooks, IndexPageBooksVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IndexPageBooks, IndexPageBooksVariables>(IndexPageBooksDocument, options);
}
export function useIndexPageBooksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IndexPageBooks, IndexPageBooksVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IndexPageBooks, IndexPageBooksVariables>(IndexPageBooksDocument, options);
}
export type IndexPageBooksHookResult = ReturnType<typeof useIndexPageBooks>;
export type IndexPageBooksLazyQueryHookResult = ReturnType<typeof useIndexPageBooksLazyQuery>;
export type IndexPageBooksQueryResult = Apollo.QueryResult<IndexPageBooks, IndexPageBooksVariables>;
export const ReviewPageReviewDocument = gql`
  query ReviewPageReview($id: ID) {
    review(id: $id) {
      body
      edition {
        title
        book {
          ...AuthorsFragment
        }
      }
    }
  }
  ${AuthorsFragment}
`;

/**
 * __useReviewPageReview__
 *
 * To run a query within a React component, call `useReviewPageReview` and pass it any options that fit your needs.
 * When your component renders, `useReviewPageReview` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewPageReview({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReviewPageReview(
  baseOptions?: Apollo.QueryHookOptions<ReviewPageReview, ReviewPageReviewVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReviewPageReview, ReviewPageReviewVariables>(ReviewPageReviewDocument, options);
}
export function useReviewPageReviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ReviewPageReview, ReviewPageReviewVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReviewPageReview, ReviewPageReviewVariables>(ReviewPageReviewDocument, options);
}
export type ReviewPageReviewHookResult = ReturnType<typeof useReviewPageReview>;
export type ReviewPageReviewLazyQueryHookResult = ReturnType<typeof useReviewPageReviewLazyQuery>;
export type ReviewPageReviewQueryResult = Apollo.QueryResult<ReviewPageReview, ReviewPageReviewVariables>;
export const names = {
  Query: {
    AuthorPageAuthor: 'AuthorPageAuthor',
    BookPageEdition: 'BookPageEdition',
    BookReviews: 'BookReviews',
    BookReviewsLanguages: 'BookReviewsLanguages',
    EditionsPageBook: 'EditionsPageBook',
    IndexPageBooks: 'IndexPageBooks',
    ReviewPageReview: 'ReviewPageReview',
  },
  Fragment: {
    ByAuthorsFragment: 'ByAuthorsFragment',
    AuthorsFragment: 'AuthorsFragment',
    EditionFragment: 'EditionFragment',
  },
};
