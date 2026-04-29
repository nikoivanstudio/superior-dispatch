import type { FC } from 'react';

import { cn } from '@/shared/lib/utils';
import { Spinner } from '@/shared/ui/spinner';

type Props = {
  mode: 'loading' | 'error';
  message?: string;
};

export const SettingsRequestState: FC<Props> = ({ mode, message }) => (
  <div
    className={cn(
      'mx-auto flex w-full max-w-[602px] flex-col items-center justify-center gap-3 rounded-[10px] bg-white px-8 py-12 text-center shadow-[0_0_0_1px_rgba(233,236,245,0.75)]'
    )}
  >
    {mode === 'loading' ? (
      <>
        <Spinner className='size-5 text-[#176be8]' />
        <p className='text-[15px] text-[#5f6579]'>Loading settings...</p>
      </>
    ) : (
      <>
        <p className='text-[17px] font-medium text-[#1d2234]'>
          Failed to load settings
        </p>
        <p className='text-[15px] text-[#5f6579]'>
          {message || 'Unexpected error while loading settings'}
        </p>
      </>
    )}
  </div>
);
