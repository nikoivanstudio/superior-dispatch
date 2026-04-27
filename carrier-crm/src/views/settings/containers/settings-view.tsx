import type { FC } from 'react';

import { Billing } from '@/features/billing';
import { DriversApp } from '@/features/driver-app';
import { Factoring } from '@/features/factoring';
import { Notifications } from '@/features/notifications';
import { Terminals } from '@/features/terminals';

import type { ViewTabProps } from '@/shared/ui/view-tabs';

import { SettingsViewLayout } from '../ui/settings-view-layout';

const tabs: ViewTabProps[] = [
  {
    value: 'terminals',
    label: 'Terminals',
    feature: <Terminals />
  },
  {
    value: 'driver-app',
    label: 'Driver App',
    feature: <DriversApp />
  },
  {
    value: 'billing',
    label: 'Billing',
    feature: <Billing />
  },
  {
    value: 'factoring',
    label: 'Factoring',
    feature: <Factoring />
  },
  {
    value: 'notifications',
    label: 'Notifications',
    feature: <Notifications />
  }
];

export const SettingsView: FC = () => {
  return <SettingsViewLayout tabs={tabs} defaultValue='terminals' />;
};
