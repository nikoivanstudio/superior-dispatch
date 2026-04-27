import type { FC } from 'react';

import { Bell } from '@/shared/icons/bell';
import { Button } from '@/shared/ui/button';

type Props = {
  action(arg: unknown): unknown | Promise<unknown>;
};
export const NotificationsBtn: FC<Props> = ({ action }) => (
  <Button onClick={action}>
    <Bell />
  </Button>
);
