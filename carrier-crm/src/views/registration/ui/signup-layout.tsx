import { cn } from '@bem-react/classname';
import type { FC } from 'react';

import { AppMainHeader } from '../../../widgets/app-header';

const cnRegistrationLayout = cn('RegistrationLayout');

export const RegistrationLayout: FC = () => {
  return (
    <div className={cnRegistrationLayout()}>
      <AppMainHeader />
    </div>
  );
};
