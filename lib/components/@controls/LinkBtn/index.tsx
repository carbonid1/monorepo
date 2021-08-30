import type { FC } from 'react';
import cn from 'classnames';

type Color = 'default' | 'accent';
type ReactBtn = JSX.IntrinsicElements['button'];
export interface LinkBtnProps extends ReactBtn {
  color?: Color;
}

const LinkBtn: FC<LinkBtnProps> = ({ children, className, color = 'default', ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        'hover:underline cursor-pointer leading-5',
        {
          'text-blue-500': color === 'default',
          'text-white': color === 'accent',
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default LinkBtn;
