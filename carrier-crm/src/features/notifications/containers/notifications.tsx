import type { FC } from 'react';

import { NotificationsForm } from '../ui/notifications-form';
import { NotificationsLayout } from '../ui/notifications-layout';

export const Notifications: FC = () => {
  const handleSubmit = () => true;

  return (
    <NotificationsLayout
      form={<NotificationsForm onSubmit={handleSubmit} />}
    />
  );
};
