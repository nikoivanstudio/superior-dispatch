import { apiClient } from '@/shared/api/api-client';
import { headers } from '@/shared/constants/api-constants';
import { apiUtils } from '@/shared/lib/api-utils';
import { urlUtils } from '@/shared/lib/url-utils';

import type { NotificationsEntity } from '../domain';

const NOTIFICATIONS_SETTINGS_URL = `${urlUtils.getBackendBaseUrl()}/carrier/settings/notifications`;

export const notificationsApi = {
  baseKey: ['carrier-settings', 'notifications'] as const,

  async get(): Promise<NotificationsEntity | null> {
    const response = await apiClient.get<Response>({
      url: NOTIFICATIONS_SETTINGS_URL,
      headers: { accept: 'application/json' },
      withoutParse: true
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const payload = await apiUtils.readErrorPayload(response);

      throw new Error(
        apiUtils.getErrorMessage(payload, 'Unable to load notifications')
      );
    }

    return (await response.json()) as NotificationsEntity;
  },

  async upsert(payload: {
    userId: number;
    notificationsEmail?: string;
    deliveryConfirmationsEmail?: string;
  }): Promise<NotificationsEntity> {
    const response = await apiClient.post<Response>({
      url: NOTIFICATIONS_SETTINGS_URL,
      headers: headers.json,
      body: JSON.stringify(payload),
      withoutParse: true
    });

    if (!response.ok) {
      const errorPayload = await apiUtils.readErrorPayload(response);

      throw new Error(
        apiUtils.getErrorMessage(
          errorPayload,
          'Unable to save notifications settings'
        )
      );
    }

    return (await response.json()) as NotificationsEntity;
  }
};
