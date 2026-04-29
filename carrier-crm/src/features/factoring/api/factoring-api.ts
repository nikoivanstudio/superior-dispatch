import { apiClient } from '@/shared/api/api-client';
import { headers } from '@/shared/constants/api-constants';
import { apiUtils } from '@/shared/lib/api-utils';
import { urlUtils } from '@/shared/lib/url-utils';

import type { FactoringEntity } from '../domain';

const FACTORING_SETTINGS_URL = `${urlUtils.getBackendBaseUrl()}/carrier/settings/factoring`;

export const factoringApi = {
  baseKey: ['carrier-settings', 'factoring'] as const,

  async get(): Promise<FactoringEntity | null> {
    const response = await apiClient.get<Response>({
      url: FACTORING_SETTINGS_URL,
      headers: { accept: 'application/json' },
      withoutParse: true
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const payload = await apiUtils.readErrorPayload(response);

      throw new Error(
        apiUtils.getErrorMessage(payload, 'Unable to load factoring settings')
      );
    }

    return (await response.json()) as FactoringEntity;
  },

  async upsert(payload: {
    userId: number;
    companyName?: string;
    invoiceEmail?: string;
  }): Promise<FactoringEntity> {
    const response = await apiClient.post<Response>({
      url: FACTORING_SETTINGS_URL,
      headers: headers.json,
      body: JSON.stringify(payload),
      withoutParse: true
    });

    if (!response.ok) {
      const errorPayload = await apiUtils.readErrorPayload(response);

      throw new Error(
        apiUtils.getErrorMessage(
          errorPayload,
          'Unable to save factoring settings'
        )
      );
    }

    return (await response.json()) as FactoringEntity;
  }
};
