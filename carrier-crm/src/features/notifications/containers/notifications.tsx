import type { FC } from 'react';

import { SettingsRequestState } from '@/shared/ui/settings-request-state';

import { useNotificationsSettings } from '../hooks/use-notifications-settings';
import { NotificationsForm } from '../ui/notifications-form';
import { NotificationsLayout } from '../ui/notifications-layout';

export const Notifications: FC = () => {
  const { submit, values, isLoading, error } = useNotificationsSettings();

  if (isLoading) {
    return (
      <NotificationsLayout form={<SettingsRequestState mode='loading' />} />
    );
  }

  if (error) {
    return (
      <NotificationsLayout
        form={
          <SettingsRequestState
            mode='error'
            message={error instanceof Error ? error.message : undefined}
          />
        }
      />
    );
  }

  return (
    <NotificationsLayout
      form={<NotificationsForm defaultValues={values} onSubmit={submit} />}
    />
  );
};
