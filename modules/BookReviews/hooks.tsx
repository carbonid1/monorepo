import type { ISelect } from 'components/@controls/Select';
import { useMemo } from 'react';
import languageService from 'services/language.service';
import type { TSelectLanguageOptions } from './helpers';

const useLangOptions = (languagesOpts: TSelectLanguageOptions): ISelect<string | null>['options'] => {
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
