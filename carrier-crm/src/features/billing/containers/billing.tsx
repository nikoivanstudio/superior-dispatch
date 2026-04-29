import type { FC } from 'react';

import { useBillingSettings } from '../hooks/use-billing-settings';
import { BillingForm } from '../ui/billing-form';
import { BillingLayout } from '../ui/billing-layout';

export const Billing: FC = () => {
  const { submit, values } = useBillingSettings();

  return (
    <BillingLayout
      form={<BillingForm defaultValues={values} onSubmit={submit} />}
    />
  );
};
