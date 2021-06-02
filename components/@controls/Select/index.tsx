import { Fragment, ReactText, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import cn from 'classnames';

interface ISelectOption {
  label: string;
  value: ReactText;
}
export interface ISelect {
  options: ISelectOption[];
  placeholder: string;
}

export const Select: React.FC<ISelect> = ({ options, placeholder }) => {
  const [selected, setSelected] = useState<ISelectOption['value']>();

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:text-sm">
          {selected ? (
            <span className="block truncate">{selected}</span>
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
                    'cursor-default select-none relative py-2 pl-10 pr-4'
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
                      <span className="text-blue-600 absolute inset-y-0 left-0 flex items-center pl-3">
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
