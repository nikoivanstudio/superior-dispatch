import type { Route } from '../../../../.react-router/types/app/routes/+types/protected-layout';

import { authContext, requireUser } from '@/features/auth';

export const protectedLayoutmiddleware: Route.MiddlewareFunction[] = [
  async ({ request, context }, next) => {
    const user = await requireUser(request);

    context.set(authContext, user);

    return next();
  }
];
