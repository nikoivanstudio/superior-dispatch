import type { Route } from '../../../../.react-router/types/app/routes/+types/login';
import { redirect } from 'react-router';

import { apiUtils } from '@/shared/lib/api-utils';
import { urlUtils } from '@/shared/lib/url-utils';

import { getCurrentUser } from '../api/auth-api';

export async function signinLoader({ request }: Route.LoaderArgs) {
  let user = null;

  try {
    user = await getCurrentUser(request);
  } catch (error) {
    if (!apiUtils.isBackendUnavailableError(error)) {
      throw error;
    }
  }

  if (user) {
    throw redirect(urlUtils.getPostLoginRedirect(request));
  }

  return null;
}
