import type { Route } from '../../../../.react-router/types/app/routes/+types/protected-layout';

import type { AuthUser } from '@/features/auth';
import { authContext } from '@/features/auth';

export async function protectedLayoutLoader({ context }: Route.LoaderArgs) {
  return {
    user: context.get(authContext) as AuthUser | null
  };
}
