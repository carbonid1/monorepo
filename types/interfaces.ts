export interface IAuthor {
  id: number;
  books: IBook[];
  fullName: string;
  imageUrl?: string;
}

export interface IBook {
  id: number;
  authors: IAuthor[];
  publishedIn?: string;
  editions: IEdition[];
}

export interface IEdition {
  id: number;
  book: IBook;
  description?: string;
  publishedIn?: string;
  title: string;
  lang?: string;
  reviews: IReview[];
  cover?: string;
}

export interface IReview {
  id: number;
  createdAt: string;
  body: string;
  lang?: string;
  edition: IEdition;
}
