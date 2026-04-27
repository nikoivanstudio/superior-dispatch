import { cn } from '@bem-react/classname';
import type { FC, ReactNode } from 'react';

type Props = {
  form: ReactNode;
};

const cnBillingFeature = cn('BillingFeature');

export const BillingLayout: FC<Props> = ({ form }) => (
  <div className={cnBillingFeature()}>{form}</div>
);
