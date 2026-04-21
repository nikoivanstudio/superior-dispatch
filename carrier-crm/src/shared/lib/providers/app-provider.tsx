
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { FC, PropsWithChildren } from 'react';

import { queryClient } from '../../api/query-client';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <>
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </>
);
