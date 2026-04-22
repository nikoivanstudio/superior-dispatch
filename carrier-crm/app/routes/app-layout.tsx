import { AppLayout } from '@/app/app-layout';
import { AppMainHeader } from '@/widgets/app-header';
import { Outlet } from 'react-router';

export default function AppLayoutRoute() {
  return <AppLayout header={<AppMainHeader />} main={<Outlet />} />;
}
