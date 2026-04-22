import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { FC, PropsWithChildren } from 'react';

import { SidebarProvider } from '@/shared/ui/sidebar';
import { TooltipProvider } from '@/shared/ui/tooltip';

import { queryClient } from '../../api/query-client';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <TooltipProvider>
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SidebarProvider>
  </TooltipProvider>
);
