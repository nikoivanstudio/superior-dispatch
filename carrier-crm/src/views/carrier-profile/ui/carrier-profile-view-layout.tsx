import { cn } from '@bem-react/classname';
import type { FC } from 'react';

import { type ViewTabProps, ViewTabs } from '@/shared/ui/view-tabs';

const cnCarrierProfile = cn('CarrierProfile');

type Props = {
  tabs: ViewTabProps[];
  defaultValue: string;
};

export const CarrierProfileLayout: FC<Props> = ({ tabs, defaultValue }) => (
  <div className={cnCarrierProfile()}>
    <ViewTabs tabs={tabs} defaultValue={defaultValue} />
  </div>
);
