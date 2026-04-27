import { cn as bemCn } from '@bem-react/classname';
import type { FC, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

type Props = {
  main: ReactNode;
  form: ReactNode;
};

const cnTerminalsFeature = bemCn('TerminalsFeature');

export const TerminalsLayout: FC<Props> = ({ main, form }) => {
  return (
    <div
      className={cn(
        cnTerminalsFeature(),
        'flex w-full flex-col items-center px-5 pt-4 pb-12 sm:px-8'
      )}
    >
      <section className="w-full max-w-[600px] rounded-[10px] bg-white px-8 py-7 shadow-[0_0_0_1px_rgba(233,236,245,0.75)] sm:px-8">
        {main}
      </section>

      <div className="mt-6 flex justify-center">{form}</div>
    </div>
  );
};
