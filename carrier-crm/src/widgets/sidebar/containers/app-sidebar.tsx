import { ChevronLeftIcon } from 'lucide-react';
import type { FC } from 'react';
import { Link, useLocation } from 'react-router';

import {
  SidebarLayout,
  type SidebarLayoutGroup,
  type SidebarLayoutItem
} from '../ui/sidebar-layout';
import type { AppSidebarProps } from '../domain';

const isPathActive = (pathname: string, to: string, end?: boolean) => {
  if (end) {
    return pathname === to;
  }

  if (to === '/') {
    return pathname === '/';
  }

  return pathname === to || pathname.startsWith(`${to}/`);
};

export const AppSidebar: FC<AppSidebarProps> = ({
  title,
  backTo = '/',
  groups,
  header
}) => {
  const location = useLocation();

  const mappedGroups: SidebarLayoutGroup[] = groups.map((group) => ({
    id: group.id,
    items: group.items.map<SidebarLayoutItem>((item) => {
      if (item.type === 'logout') {
        return {
          id: item.id,
          type: 'logout',
          label: item.label,
          action: item.action,
          method: item.method
        };
      }

      return {
        id: item.id,
        type: 'link',
        label: item.label,
        to: item.to,
        isActive: isPathActive(location.pathname, item.to, item.end)
      };
    })
  }));

  return (
    <SidebarLayout
      header={
        header ?? (
          <div className="flex items-center gap-3 text-[#5f6478]">
            <Link
              to={backTo}
              className="inline-flex size-7 items-center justify-center rounded-full transition-colors hover:bg-white/80 hover:text-[#232736]"
              aria-label="Back"
            >
              <ChevronLeftIcon className="size-5" />
            </Link>
            <span className="text-[1.875rem] font-semibold tracking-[-0.04em] text-[#5a5f73]">
              {title}
            </span>
          </div>
        )
      }
      groups={mappedGroups}
    />
  );
};
