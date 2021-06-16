import type { FC, ReactNode } from 'react';

export interface IBaseError {
  img: ReactNode;
  title: ReactNode;
  subTitle: ReactNode;
}

export const BaseError: FC<IBaseError> = ({ img, title, subTitle }) => {
  return (
    <div className="grid gap-4 m-8 place-items-center">
      {img}
      <div className="text-2xl">{title}</div>
      <div className="text-grey-400">{subTitle}</div>
    </div>
  );
};
