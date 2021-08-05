import type { Book, Edition } from 'generated/graphql';

export namespace NBookReviews {
  export interface Props {
    bookId: Book['id'];
    editionId: Edition['id'];
  }

  interface SelectedLanguageOption {
    count: number;
    lang: string;
  }

  export type LangOptions = SelectedLanguageOption[];

  export type SelectedLanguage = SelectedLanguageOption['lang'] | null;
}
