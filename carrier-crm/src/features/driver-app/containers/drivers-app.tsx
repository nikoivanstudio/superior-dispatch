import type { FC } from 'react';

import { useDriverAppSettings } from '../hooks/use-driver-app-settings';
import { DriverAppForm } from '../ui/driver-app-form';
import { DriverAppLayout } from '../ui/driver-app-layout';

export const DriversApp: FC = () => {
  const { submit, values } = useDriverAppSettings();

  return (
    <DriverAppLayout
      form={<DriverAppForm defaultValues={values} onSubmit={submit} />}
    />
  );
};
