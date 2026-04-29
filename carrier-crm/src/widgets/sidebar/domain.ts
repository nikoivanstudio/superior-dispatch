import type { ReactNode } from 'react';

export type SidebarContainerLinkItem = {
  id: string;
  type?: 'link';
  label: string;
  to: string;
  end?: boolean;
};

export type SidebarContainerLogoutItem = {
  id: string;
  type: 'logout';
  label: string;
  action?: string;
  method?: 'get' | 'post';
};

export type SidebarContainerItem =
  | SidebarContainerLinkItem
  | SidebarContainerLogoutItem;

export type SidebarContainerGroup = {
  id: string;
  items: SidebarContainerItem[];
};

export type AppSidebarProps = {
  title: string;
  groups: SidebarContainerGroup[];
  activePath?: string;
  backTo?: string;
  header?: ReactNode;
};
