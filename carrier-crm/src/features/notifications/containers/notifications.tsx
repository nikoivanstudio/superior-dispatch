import type { FC } from 'react';

import { useNotificationsSettings } from '../hooks/use-notifications-settings';
import { NotificationsForm } from '../ui/notifications-form';
import { NotificationsLayout } from '../ui/notifications-layout';

export const Notifications: FC = () => {
  const { submit, values } = useNotificationsSettings();

  return (
    <NotificationsLayout
      form={<NotificationsForm defaultValues={values} onSubmit={submit} />}
    />
  );
};
