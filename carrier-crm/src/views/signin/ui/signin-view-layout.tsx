import type { FC, ReactNode } from 'react';

type Props = {
  header: ReactNode;
  main: ReactNode;
  footer: ReactNode;
  aside?: ReactNode;
};

export const SigninViewLayout: FC<Props> = ({
  header,
  main,
  footer,
  aside
}) => {
  return (
    <div>
      {header}
      {main}
      {aside}
      {footer}
    </div>
  );
};
