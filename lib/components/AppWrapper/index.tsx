import type { FC } from 'react';

const AppWrapper: FC = ({ children }) => (
  <div className="flex flex-col flex-1 w-full max-w-5xl p-4 mx-auto">{children}</div>
);

export default AppWrapper;
