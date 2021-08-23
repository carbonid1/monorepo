import type { Book, Edition } from 'lib/generated/graphql';

interface SelectedLanguageOption {
  count: number;
  lang: string;
}

export type LangOptions = SelectedLanguageOption[];

export type SelectedLanguage = SelectedLanguageOption['lang'] | null;

export interface BookReviewsProps {
  bookId: Book['id'];
  editionId: Edition['id'];
}
