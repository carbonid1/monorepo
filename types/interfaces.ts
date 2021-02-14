export interface IBook {
  id: number;
  createdAt: string;
  updatedAt: string;
  authors: IAuthor[];
  description?: string;
  publishedIn?: string;
  slug: string;
  title: string;
}

export interface IAuthor {
  id: number;
  updatedAt: string;
  books: IBook[];
  fullName: string;
  slug: string;
}
