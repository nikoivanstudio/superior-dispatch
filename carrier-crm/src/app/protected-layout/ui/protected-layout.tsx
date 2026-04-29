import type { FC } from 'react';
import { Outlet } from 'react-router';

export const ProtectedLayout: FC = () => (
  <div className='flex min-h-full'>
    <Outlet />
  </div>
);
