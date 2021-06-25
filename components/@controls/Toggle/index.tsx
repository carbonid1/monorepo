import cn from 'classnames';
import type { ReactNode } from 'react';
import { Switch } from '@headlessui/react';

export interface IToggle {
  className?: string;
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
  label?: ReactNode;
  srLabel?: string;
  isPassiveLabel?: boolean;
  // description?: ReactNode;
  labelPosition?: 'left' | 'right';
}

export const Toggle: React.FC<IToggle> = ({
  label,
  srLabel,
  onChange,
  className,
  isChecked,
  // description,
  isPassiveLabel,
  labelPosition = 'right',
}) => {
  return (
    <Switch.Group as="div" className={cn('inline-flex gap-x-2 items-center justify-between', className)}>
      {label && labelPosition === 'left' && (
        <Switch.Label passive={isPassiveLabel} className="text-sm font-medium text-grey-900">
          {label}
        </Switch.Label>
      )}
      {/* {description && <Switch.Description className="text-sm text-grey-500">{description}</Switch.Description>} */}
      <Switch
        onChange={onChange}
        checked={isChecked}
        className={cn(
          isChecked ? 'bg-blue-400' : 'bg-grey-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200',
        )}
      >
        {srLabel && !label && <span className="sr-only">{srLabel}</span>}
        <span
          aria-hidden
          className={cn(
            isChecked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
          )}
        />
      </Switch>
      {label && labelPosition === 'right' && (
        <Switch.Label passive={isPassiveLabel} className="text-sm font-medium text-grey-900">
          {label}
        </Switch.Label>
      )}
    </Switch.Group>
  );
};

Toggle.propTypes = {
  label: function (props) {
    if (!props.srLabel && !props.label) {
      return new Error('Please provide either a label or a screen reader label!');
    } else return null;
  },
};

// * 1) I can decouple group, label and description from the switch
// *   if I would like to use Swith without those particular components
// * 2) Description is not handled properly. Will be fixed in the future if needed
