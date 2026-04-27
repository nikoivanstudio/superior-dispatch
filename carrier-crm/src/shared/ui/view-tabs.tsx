import type { FC, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

export type ViewTabProps = {
  value: string;
  label: ReactNode;
  feature: ReactNode;
};
type Props = {
  tabs: ViewTabProps[];
  defaultValue: string;
};

export const ViewTabs: FC<Props> = ({ tabs, defaultValue }) => (
  <Tabs defaultValue={defaultValue}>
    <TabsList className={cn('gap-6')}>
      {tabs.map(({ value, label }, idx) => (
        <TabsTrigger className={cn('text-xl')} value={value} key={idx}>
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
    {tabs.map(({ value, feature }, idx) => (
      <TabsContent value={value} key={idx}>
        {feature}
      </TabsContent>
    ))}
  </Tabs>
);
