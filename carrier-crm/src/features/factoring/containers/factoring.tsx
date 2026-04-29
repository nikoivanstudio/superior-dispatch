import type { FC } from 'react';

import { useFactoringSettings } from '../hooks/use-factoring-settings';
import { FactoringForm } from '../ui/factoring-form';
import { FactoringLayout } from '../ui/factoring-layout';

export const Factoring: FC = () => {
  const { submit, values } = useFactoringSettings();

  return (
    <FactoringLayout
      form={<FactoringForm defaultValues={values} onSubmit={submit} />}
    />
  );
};
