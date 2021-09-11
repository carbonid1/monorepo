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
      <$.Switch onChange={onChange} checked={isChecked}>
        {srLabel && !label && <span className="sr-only">{srLabel}</span>}
        <$.Knob aria-hidden isChecked={isChecked} />
      </$.Switch>
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
