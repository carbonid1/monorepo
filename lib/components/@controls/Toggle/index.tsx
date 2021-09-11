import cn from 'classnames';
import { Switch } from '@headlessui/react';
import $ from './styled';

export interface IToggle {
  className?: string;
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
  label?: React.ReactNode;
  srLabel?: string;
  isPassiveLabel?: boolean;
  labelPosition?: 'left' | 'right';
}

export const Toggle: React.FC<IToggle> = ({
  label,
  srLabel,
  onChange,
  className,
  isChecked,
  isPassiveLabel,
  labelPosition = 'right',
}) => {
  return (
    <Switch.Group as={$.Root} className={className}>
      {label && labelPosition === 'left' && <$.SwitchLabel passive={isPassiveLabel}>{label}</$.SwitchLabel>}
      <Switch
        onChange={onChange}
        checked={isChecked}
        className={cn(
          isChecked ? 'bg-blue-400' : 'bg-grey-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200',
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
      {label && labelPosition === 'right' && <$.SwitchLabel passive={isPassiveLabel}>{label}</$.SwitchLabel>}
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
