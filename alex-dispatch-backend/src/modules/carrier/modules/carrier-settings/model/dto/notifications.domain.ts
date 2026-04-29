import { Notifications } from 'generated/prisma/client';
import { z } from 'zod';

export const createNotificationsDtoSchema = z.object({
  userId: z.number(),
  notificationsEmail: z.email().optional(),
  deliveryConfirmationsEmail: z.email().optional()
});

export type NotificationsEntity = {
  id: number;
  userId: number;
  notificationsEmail?: string;
  deliveryConfirmationsEmail?: string;
};

export type NotificationsDomain = Notifications;
export type CreateNotificationsDto = z.infer<
  typeof createNotificationsDtoSchema
>;
export type UpdateNotificationsDto = NotificationsEntity;
