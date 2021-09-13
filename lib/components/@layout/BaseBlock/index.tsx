import type { FC, ReactNode } from 'react';

export interface IBaseBlock {
  img: ReactNode;
  title?: ReactNode;
  subTitle: ReactNode;
}

export const BaseBlock: FC<IBaseBlock> = ({ img, title, subTitle }) => {
  return (
    <div className="m-8 grid gap-4 place-items-center">
      {img}
      {title && <div className="text-2xl">{title}</div>}
      <div className="text-center text-grey-400">{subTitle}</div>
    </div>
  );
};
