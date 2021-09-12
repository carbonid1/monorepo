import React, { Fragment, useMemo } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import cn from 'classnames';
import $ from './styled';

interface ISelectOption<V> {
  label: string;
  value: V;
}
export interface ISelect<V> {
  options: ISelectOption<V>[];
  placeholder?: string;
  value: ISelectOption<V>['value'];
  onChange: (value: ISelectOption<V>['value']) => void;
}

export const Select = <V,>({ value, options, onChange, placeholder = 'Select an Option' }: ISelect<V>): JSX.Element => {
  const selectedOption = useMemo(() => {
    return options.find(option => option.value === value);
  }, [options, value]);

  return (
    <Listbox value={value} onChange={onChange}>
      <$.InnerWrapper>
        <Listbox.Button as={$.Button} className="sm:text-sm">
          {selectedOption ? (
            <span className="block truncate">{selectedOption.label}</span>
          ) : (
            <span className="block truncate text-grey-400">{placeholder}</span>
          )}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="w-5 h-5 text-grey-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options as={$.Options} className="sm:text-sm">
            {options.map((option, index) => (
              <Listbox.Option key={index} value={option.value} as={Fragment}>
                {({ selected, active }) => (
                  <$.Option active={active}>
                    <span className={cn(selected ? 'font-medium' : 'font-normal', 'block truncate')}>
                      {option.label}
                    </span>

                    {selected && (
                      <$.CheckIconBlock>
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </$.CheckIconBlock>
                    )}
                  </$.Option>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </$.InnerWrapper>
    </Listbox>
  );
};
