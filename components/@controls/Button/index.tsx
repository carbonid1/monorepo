import cn from 'classnames';

type ReactBtn = JSX.IntrinsicElements['button'];

export type TButtonProps = ReactBtn;

export const Button: React.FC<TButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={cn(className)}>
      {children}
    </button>
  );
};
