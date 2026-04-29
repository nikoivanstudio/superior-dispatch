import type { FC } from 'react';

import { SettingsRequestState } from '@/shared/ui/settings-request-state';

import { useDriverAppSettings } from '../hooks/use-driver-app-settings';
import { DriverAppForm } from '../ui/driver-app-form';
import { DriverAppLayout } from '../ui/driver-app-layout';

export const DriversApp: FC = () => {
  const { submit, values, isLoading, error } = useDriverAppSettings();

  if (isLoading) {
    return <DriverAppLayout form={<SettingsRequestState mode='loading' />} />;
  }

  if (error) {
    return (
      <DriverAppLayout
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
    <DriverAppLayout
      form={<DriverAppForm defaultValues={values} onSubmit={submit} />}
    />
  );
};
