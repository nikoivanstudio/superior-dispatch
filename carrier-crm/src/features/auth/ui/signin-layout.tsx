import type { FC, ReactNode } from 'react';

type Props = {
  form: ReactNode;
  actions: ReactNode;
};

export const SigninLayout: FC<Props> = ({ form, actions }) => {
  return (
    <div>
      {form}
      {actions}
    </div>
  );
};
