import type { Route } from './+types/protected-layout';
import { Outlet } from 'react-router';

import { AppMainHeader } from '@/widgets/app-header';
import type { AuthUser } from '../lib/auth.server';
import { authUserContext, requireUser } from '../lib/auth.server';

export const middleware: Route.MiddlewareFunction[] = [
  async ({ request, context }, next) => {
    const user = await requireUser(request);

    context.set(authUserContext, user);

    return next();
  }
];

export async function loader({ context }: Route.LoaderArgs) {
  return {
    user: context.get(authUserContext) as AuthUser | null
  };
}

export default function ProtectedLayoutRoute() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <AppMainHeader />
      <Outlet />
    </div>
  );
}
