import type { BillingSettingsEntity } from '../domain';

import { apiClient } from '@/shared/api/api-client';
import { headers } from '@/shared/constants/api-constants';
import { apiUtils } from '@/shared/lib/api-utils';
import { urlUtils } from '@/shared/lib/url-utils';

const BILLING_SETTINGS_URL = `${urlUtils.getBackendBaseUrl()}/carrier/settings/billing`;

export const billingApi = {
  baseKey: ['carrier-settings', 'billing'] as const,

  async get(): Promise<BillingSettingsEntity | null> {
    const response = await apiClient.get<Response>({
      url: BILLING_SETTINGS_URL,
      headers: { accept: 'application/json' },
      withoutParse: true
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const payload = await apiUtils.readErrorPayload(response);

      throw new Error(
        apiUtils.getErrorMessage(payload, 'Unable to load billing settings')
      );
    }

    return (await response.json()) as BillingSettingsEntity;
  },

  async upsert(payload: {
    userId: number;
    attachInvoices?: boolean;
    deliveryDates?: boolean;
    invoiceEmail?: string;
  }): Promise<BillingSettingsEntity> {
    const response = await apiClient.post<Response>({
      url: BILLING_SETTINGS_URL,
      headers: headers.json,
      body: JSON.stringify(payload),
      withoutParse: true
    });

    if (!response.ok) {
      const errorPayload = await apiUtils.readErrorPayload(response);

      throw new Error(
        apiUtils.getErrorMessage(
          errorPayload,
          'Unable to save billing settings'
        )
      );
    }

    return (await response.json()) as BillingSettingsEntity;
  }
};
