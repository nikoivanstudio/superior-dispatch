import type { FC } from 'react';

import { FactoringForm } from '../ui/factoring-form';
import { FactoringLayout } from '../ui/factoring-layout';

export const Factoring: FC = () => {
  const handleSubmit = () => true;

  return <FactoringLayout form={<FactoringForm onSubmit={handleSubmit} />} />;
};
