import type { FC } from 'react';

import { cn } from '@/shared/lib/utils';

import { TerminalDialog } from '../ui/terminal-dialog';
import { TerminalsLayout } from '../ui/terminals-layout';

export const Terminals: FC = () => {
  const handleSubmit = () => true;

  return (
    <TerminalsLayout
      main={
        <div className='space-y-8'>
          <p className='text-left text-[18px] leading-[1.42] font-normal tracking-[-0.01em] text-[#1f2434]'>
            Terminals are used to manage orders that involve yards or terminals,
            order splits, and multiple drivers.{' '}
            <button
              type='button'
              className='font-semibold text-[#176be8] transition-colors hover:text-[#0f57c2]'
            >
              Learn more...
            </button>
          </p>
          <div className={cn('mt-5')}>
            <p className='text-center text-[18px] leading-[1.45] font-normal tracking-[-0.01em] text-[#66647a]'>
              There are no terminals added
            </p>
          </div>
        </div>
      }
      form={<TerminalDialog onSubmit={handleSubmit} />}
    />
  );
};
