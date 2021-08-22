import cn from 'classnames';

type ReactBtn = JSX.IntrinsicElements['button'];

export interface IButton extends ReactBtn {}

export const Button: React.FC<IButton> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={cn(className)}>
      {children}
    </button>
  );
};
