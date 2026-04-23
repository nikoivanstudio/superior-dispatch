import type { FC } from 'react';
import { Outlet } from 'react-router';

import { ViewLayout } from '../../../shared/ui/view-layout';
import { AppSidebar, type AppSidebarProps } from '../../../widgets/sidebar';

export const GroupViewsLayout: FC<AppSidebarProps> = (props) => (
  <ViewLayout aside={<AppSidebar {...props} />} main={<Outlet />} />
);
