import languageService from 'services/language.service';
import { useMemo } from 'react';
import type { ISelect } from 'components/@controls/Select';
import type { NBookReviews } from './interface';

const useLangOptions = (languagesOpts: NBookReviews.LangOptions): ISelect<string | null>['options'] => {
  return useMemo(() => {
    const selectOptions = languagesOpts.map(({ lang, count }) => ({
      value: lang,
      label: `${languageService.getName(lang)} (${count})`,
    }));
    return [{ value: null, label: 'All Languages' }, ...selectOptions];
  }, [languagesOpts]);
};

export default {
  useLangOptions,
};
