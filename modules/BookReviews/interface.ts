import type { IBook, IEdition, IReview } from 'types/interfaces';

export namespace NBookReviews {
  export interface Props {
    bookId: IBook['id'];
    editionId: IEdition['id'];
  }

  interface SelectedLanguageOption {
    count: number;
    lang: string;
  }

  export type LangOptions = SelectedLanguageOption[];

  export type SelectedLanguage = string | null;

  export interface QData {
    reviews: IReview[];
  }

  export interface QVars {
    bookId: number | null;
    editionId: number | null;
    lang: string | null;
  }
}
