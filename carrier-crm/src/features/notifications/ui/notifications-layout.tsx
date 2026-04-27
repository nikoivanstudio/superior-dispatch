import { cn } from '@bem-react/classname';
import type { FC, ReactNode } from 'react';

type Props = {
  form: ReactNode;
};

const cnNotificationsFeature = cn('NotificationsFeature');

export const NotificationsLayout: FC<Props> = ({ form }) => (
  <div className={cnNotificationsFeature()}>{form}</div>
);
