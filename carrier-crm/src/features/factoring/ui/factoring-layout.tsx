import { cn } from '@bem-react/classname';
import type { FC, ReactNode } from 'react';

type Props = {
  form: ReactNode;
};

const cnFactoringFeature = cn('FactoringFeature');

export const FactoringLayout: FC<Props> = ({ form }) => (
  <div className={cnFactoringFeature()}>{form}</div>
);
