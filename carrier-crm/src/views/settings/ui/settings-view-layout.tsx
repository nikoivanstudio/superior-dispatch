import { cn } from '@bem-react/classname';
import type { FC } from 'react';

import { type ViewTabProps, ViewTabs } from '@/shared/ui/view-tabs';

const cnSettingsView = cn('SettingsView');

type Props = {
  tabs: ViewTabProps[];
  defaultValue: string;
};

export const SettingsViewLayout: FC<Props> = ({ tabs, defaultValue }) => (
  <div className={cnSettingsView()}>
    <ViewTabs tabs={tabs} defaultValue={defaultValue} />
  </div>
);
