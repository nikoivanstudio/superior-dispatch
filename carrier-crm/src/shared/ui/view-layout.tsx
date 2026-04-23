import type { FC, ReactNode } from 'react';

type Props = {
  main: ReactNode;
  aside?: ReactNode;
};

export const ViewLayout: FC<Props> = ({ aside, main }) => (
  <div>
    {!!aside && <aside>{aside}</aside>}
    <main>{main}</main>
  </div>
);
