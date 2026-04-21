import { cn } from '@bem-react/classname';
import type { FC, ReactNode } from 'react';

type Props = {
  logo: ReactNode;
  contactPhone: ReactNode;
  actions: ReactNode;
};

const cnNavBar = cn('NavBar');

export const NavBar: FC<Props> = ({ logo, contactPhone, actions }) => (
  <div
    className={cnNavBar(null, [
      'flex',
      'items-center',
      'justify-between',
      'gap-6',
      'px-6',
      'py-4',
      'sm:px-10'
    ])}
  >
    <div className="flex min-w-0 items-center gap-9">
      {logo}
      {contactPhone}
    </div>
    <div className="flex items-center">{actions}</div>
  </div>
);
