import type { FC } from 'react';
import { Outlet, resolvePath, useLocation } from 'react-router';

import { cn } from '@/shared/lib/utils';

import { ViewLayout } from '../../../shared/ui/view-layout';
import { AppSidebar, type AppSidebarProps } from '../../../widgets/sidebar';

export const GroupViewsLayout: FC<AppSidebarProps> = (props) => {
  const location = useLocation();

  const isPathActive = (pathname: string, to: string, end?: boolean) => {
    if (end) return pathname === to;
    if (to === '/') return pathname === '/';

    return pathname === to || pathname.startsWith(`${to}/`);
  };

  const activeItem = props.groups
    .flatMap((group) => group.items)
    .find(
      (item) =>
        item.type !== 'logout' &&
        isPathActive(
          location.pathname,
          resolvePath(item.to, location.pathname).pathname,
          item.end
        )
    );

  const title = activeItem?.label ?? 'Settings';

  return (
    <ViewLayout
      aside={<AppSidebar {...props} title={props.title} />}
      main={
        <div>
          <h1
            className={cn(
              'text-3xl',
              'px-10',
              'm-0',
              'text-zinc-700',
              'text-left',
              'font-bold'
            )}
          >
            {title}
          </h1>
          <Outlet />
        </div>
      }
    />
  );
};
