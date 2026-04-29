import type { FC } from 'react';

import { SettingsRequestState } from '@/shared/ui/settings-request-state';

import { useBillingSettings } from '../hooks/use-billing-settings';
import { BillingForm } from '../ui/billing-form';
import { BillingLayout } from '../ui/billing-layout';

export const Billing: FC = () => {
  const { submit, values, isLoading, error } = useBillingSettings();

  if (isLoading) {
    return <BillingLayout form={<SettingsRequestState mode='loading' />} />;
  }

  if (error) {
    return (
      <BillingLayout
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
    <BillingLayout
      form={<BillingForm defaultValues={values} onSubmit={submit} />}
    />
  );
};
