import type { FC, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

type Props = {
  main: ReactNode;
  aside?: ReactNode;
};

export const ViewLayout: FC<Props> = ({ aside, main }) => (
  <div className={cn('flex', 'justify-between', 'w-full')}>
    {!!aside && <aside className={cn('w-1/4')}>{aside}</aside>}
    <main className={cn('w-3/4')}>{main}</main>
  </div>
);
