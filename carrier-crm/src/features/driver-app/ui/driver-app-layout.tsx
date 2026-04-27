import { cn } from '@bem-react/classname';
import type { FC, ReactNode } from 'react';

type Props = {
  form: ReactNode;
  actions?: ReactNode;
};

const cnDriverAppFeature = cn('DriverAppFeature');

export const DriverAppLayout: FC<Props> = ({ form, actions }) => (
  <div className={cnDriverAppFeature()}>
    {form}
    {actions}
  </div>
);
