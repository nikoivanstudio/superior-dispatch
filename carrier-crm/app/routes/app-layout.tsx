import { AppMainHeader } from '@/widgets/app-header';
import { Outlet } from 'react-router';
import { AppLayout } from '../../src/app/app-layout';

export default function AppLayoutRoute() {
  return <AppLayout header={<AppMainHeader />} main={<Outlet />} />;
}
