import type { Route } from '../../../../.react-router/types/app/routes/+types/protected-layout';

import { authContext, requireUser } from '@/features/auth';

import { apiUtils } from '@/shared/lib/api-utils';

export const protectedLayoutmiddleware: Route.MiddlewareFunction[] = [
  async ({ request, context }, next) => {
    let user = null;

    try {
      user = await requireUser(request);
    } catch (error) {
      if (!apiUtils.isBackendUnavailableError(error)) {
        throw error;
      }
    }

    context.set(authContext, user);

    return next();
  }
];
