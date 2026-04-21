import type { FC } from 'react';

export const AppFooter: FC = () => (
  <footer
    className="mx-auto mt-4 w-fit text-center text-[11px] leading-none font-bold uppercase tracking-[-0.01em]"
    style={{ color: 'var(--app-footer-text)' }}
  >
    © {new Date().getFullYear()} Turbo Dispatch. All rights reserved.
  </footer>
);
