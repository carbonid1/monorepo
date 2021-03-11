export interface IAuthor {
  books: IBook[];
  id: number;
  fullName: string;
}

export interface IBook {
  authors: IAuthor[];
  id: number;
  publishedIn?: number;
  editions: IEdition[];
  reviews: IReview[];
}

export interface IEdition {
  book: IBook;
  description?: string;
  id: number;
  publishedIn?: number;
  title: string;
}

export interface IReview {
  id: number;
  body: string;
}
