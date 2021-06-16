import { Fragment, useMemo } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import cn from 'classnames';

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

export const Select = <V,>({ options, placeholder = 'Select an Option', onChange, value }: ISelect<V>) => {
  const selectedOption = useMemo(() => {
    return options.find(option => option.value === value);
  }, [options, value]);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-52">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:text-sm">
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
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  cn(
                    active ? 'text-blue-500 bg-blue-100' : 'text-grey-900',
                    'cursor-default select-none relative py-2 pl-10 pr-4',
                  )
                }
                value={option.value}
              >
                {({ selected }) => (
                  <>
                    <span className={cn(selected ? 'font-medium' : 'font-normal', 'block truncate')}>
                      {option.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
