export type NotificationsEntity = {
  id: number;
  userId: number;
  notificationsEmail?: string;
  deliveryConfirmationsEmail?: string;
};

export type NotificationsFormValues = {
  notificationEmails: string;
  deliveryConfirmationEmails: string;
};

export const defaultNotificationsFormValues: NotificationsFormValues = {
  notificationEmails: '',
  deliveryConfirmationEmails: ''
};

export const mapNotificationsToFormValues = (
  settings?: NotificationsEntity | null
): NotificationsFormValues => ({
  notificationEmails:
    settings?.notificationsEmail ??
    defaultNotificationsFormValues.notificationEmails,
  deliveryConfirmationEmails:
    settings?.deliveryConfirmationsEmail ??
    defaultNotificationsFormValues.deliveryConfirmationEmails
});
