import { Link } from 'react-router';
import { useRouteLoaderData } from 'react-router';

import { Button } from '@/shared/ui/button';
import type { AuthUser } from '../lib/auth.server';
import type { loader as protectedLayoutLoader } from './protected-layout';

const metrics = [
  { label: 'Active loads', value: '12' },
  { label: 'Pending documents', value: '4' },
  { label: 'Driver issues', value: '2' }
];

export default function DashboardRoute() {
  const protectedData = useRouteLoaderData<typeof protectedLayoutLoader>(
    'routes/protected-layout'
  );
  const user = protectedData?.user as AuthUser | null | undefined;

  return (
    <section className="flex flex-1 flex-col gap-8 px-6 py-8 md:px-10">
      <div className="flex flex-col gap-3 text-left">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Protected route
        </p>
        <h1 className="m-0 text-4xl font-semibold tracking-tight text-foreground">
          Carrier CRM dashboard
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          SSR skeleton is wired. This screen now lives under the protected branch, and
          the next step is to attach server-side auth validation to this layout.
        </p>
        {user ? (
          <p className="text-sm text-muted-foreground">
            Server auth check passed for{' '}
            <span className="font-medium text-foreground">{user.email}</span>.
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-2xl border border-border bg-card p-5 text-left shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{metric.value}</p>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-dashed border-border bg-muted/40 p-6 text-left">
        <p className="text-sm font-medium text-foreground">Auth boundary is ready too.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Anonymous requests should now redirect to the public login route before this
          page renders on the server.
        </p>
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link to="/">Open sign-in route</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
