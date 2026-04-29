import type { FC } from 'react';

import { SettingsRequestState } from '@/shared/ui/settings-request-state';

import { useFactoringSettings } from '../hooks/use-factoring-settings';
import { FactoringForm } from '../ui/factoring-form';
import { FactoringLayout } from '../ui/factoring-layout';

export const Factoring: FC = () => {
  const { submit, values, isLoading, error } = useFactoringSettings();

  if (isLoading) {
    return <FactoringLayout form={<SettingsRequestState mode='loading' />} />;
  }

  if (error) {
    return (
      <FactoringLayout
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
    <FactoringLayout
      form={<FactoringForm defaultValues={values} onSubmit={submit} />}
    />
  );
};
