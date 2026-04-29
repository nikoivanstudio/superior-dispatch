import { apiClient } from '@/shared/api/api-client';
import { headers } from '@/shared/constants/api-constants';
import { apiUtils } from '@/shared/lib/api-utils';
import { urlUtils } from '@/shared/lib/url-utils';

import type { DriverAppSettingsEntity } from '../domain';

const DRIVER_APP_SETTINGS_URL = `${urlUtils.getBackendBaseUrl()}/carrier/settings/driver_app`;

export const driverAppApi = {
  baseKey: ['carrier-settings', 'driver-app'] as const,

  async get(): Promise<DriverAppSettingsEntity | null> {
    const response = await apiClient.get<Response>({
      url: DRIVER_APP_SETTINGS_URL,
      headers: { accept: 'application/json' },
      withoutParse: true
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const payload = await apiUtils.readErrorPayload(response);

      throw new Error(
        apiUtils.getErrorMessage(payload, 'Unable to load driver app settings')
      );
    }

    return (await response.json()) as DriverAppSettingsEntity;
  },

  async upsert(payload: {
    userId: number;
    hidePayment?: boolean;
    disableCustomer?: boolean;
    driverPay?: boolean;
  }): Promise<DriverAppSettingsEntity> {
    const response = await apiClient.post<Response>({
      url: DRIVER_APP_SETTINGS_URL,
      headers: headers.json,
      body: JSON.stringify(payload),
      withoutParse: true
    });

    if (!response.ok) {
      const errorPayload = await apiUtils.readErrorPayload(response);

      throw new Error(
        apiUtils.getErrorMessage(
          errorPayload,
          'Unable to save driver app settings'
        )
      );
    }

    return (await response.json()) as DriverAppSettingsEntity;
  }
};
