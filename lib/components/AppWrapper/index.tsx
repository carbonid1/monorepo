import type { FC } from 'react';
import $ from './styled';

const AppWrapper: FC = ({ children }) => <$.Root>{children}</$.Root>;

export default AppWrapper;
