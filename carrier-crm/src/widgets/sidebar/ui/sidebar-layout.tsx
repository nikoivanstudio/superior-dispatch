import type { FC, ReactNode } from 'react';
import { Form, Link } from 'react-router';

import { cn } from '@/shared/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from '@/shared/ui/sidebar';

export type SidebarLayoutLinkItem = {
  id: string;
  type: 'link';
  label: string;
  to: string;
  isActive?: boolean;
};

export type SidebarLayoutLogoutItem = {
  id: string;
  type: 'logout';
  label: string;
  action?: string;
  method?: 'get' | 'post';
};

export type SidebarLayoutItem =
  | SidebarLayoutLinkItem
  | SidebarLayoutLogoutItem;

export type SidebarLayoutGroup = {
  id: string;
  items: SidebarLayoutItem[];
};

type Props = {
  header: ReactNode;
  groups: SidebarLayoutGroup[];
};

export const SidebarLayout: FC<Props> = ({ header, groups }) => {
  return (
    <Sidebar
      collapsible="none"
      className="w-full max-w-[21rem] border-0 bg-[#f5f5f7] text-[#1f2433]"
    >
      <SidebarHeader className="px-7 pt-5 pb-4">{header}</SidebarHeader>

      <SidebarContent className="px-7 pb-7">
        <div className="overflow-hidden rounded-2xl border border-[#ececf2] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          {groups.map((group, index) => (
            <div
              key={group.id}
              className={cn(
                'px-6 py-3',
                index > 0 && 'border-t border-[#ececf2]'
              )}
            >
              <SidebarMenu className="gap-1">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    {item.type === 'link' ? (
                      <Link
                        to={item.to}
                        className={cn(
                          'relative flex min-h-12 items-center rounded-xl px-4 py-3 text-[1.0625rem] font-medium tracking-[-0.02em] text-[#232736] transition-colors',
                          'hover:bg-[#f4f7ff] hover:text-[#1555ff]',
                          item.isActive && 'bg-[#f8fbff] font-semibold text-[#1555ff]'
                        )}
                      >
                        <span>{item.label}</span>
                        {item.isActive ? (
                          <span className="absolute top-1/2 right-0 h-8 w-0.5 -translate-y-1/2 rounded-full bg-[#1555ff]" />
                        ) : null}
                      </Link>
                    ) : (
                      <Form method={item.method ?? 'post'} action={item.action ?? '/logout'}>
                        <button
                          type="submit"
                          className="flex min-h-12 w-full items-center rounded-xl px-4 py-3 text-left text-[1.0625rem] font-medium tracking-[-0.02em] text-[#232736] transition-colors hover:bg-[#f7f7fa]"
                        >
                          {item.label}
                        </button>
                      </Form>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
