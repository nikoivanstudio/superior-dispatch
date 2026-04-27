import type { FC } from 'react';

import { BillingForm } from '../ui/billing-form';
import { BillingLayout } from '../ui/billing-layout';

export const Billing: FC = () => {
  const handleSubmit = () => true;

  return <BillingLayout form={<BillingForm onSubmit={handleSubmit} />} />;
};
