import type { FC } from 'react';

import { DriverAppForm } from '../ui/driver-app-form';
import { DriverAppLayout } from '../ui/driver-app-layout';

export const DriversApp: FC = () => {
  const handleSubmit = () => console.log('handleSubmit');

  return <DriverAppLayout form={<DriverAppForm onSubmit={handleSubmit} />} />;
};
