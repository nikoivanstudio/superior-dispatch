import { cn } from '@bem-react/classname';
import type { FC, PropsWithChildren, ReactNode } from 'react';

type Props = {
  navBar: ReactNode;
  className?: string;
};

const cnAppHeaderLayout = cn('AppHeaderLayout');

export const AppHeaderLayout: FC<PropsWithChildren<Props>> = ({
  navBar,
  children
}) => (
  <div className={cnAppHeaderLayout()}>
    <>
      {navBar}
      {children}
    </>
  </div>
);
