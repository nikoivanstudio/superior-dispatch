import type { FC, ReactNode } from 'react';

type Props = {
  header: ReactNode;
  main: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
};

export const AppLayout: FC<Props> = ({ header, main, aside, footer }) => (
  <>
    {header}
    {main}
    {aside}
    {footer}
  </>
);
