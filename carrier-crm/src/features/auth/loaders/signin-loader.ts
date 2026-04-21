import type { Route } from '../../../../.react-router/types/app/routes/+types/login';
import { redirect } from 'react-router';

import { urlUtils } from '@/shared/lib/url-utils';

import { getCurrentUser } from '../api/auth-api';

export async function signinLoader({ request }: Route.LoaderArgs) {
  const user = await getCurrentUser(request);

  if (user) {
    throw redirect(urlUtils.getPostLoginRedirect(request));
  }

  return null;
}
