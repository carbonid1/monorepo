export interface IBook {
  id: number;
  createdAt: string;
  updatedAt: string;
  author: string;
  publishedIn?: string;
  slug: string;
  title: string;
}
