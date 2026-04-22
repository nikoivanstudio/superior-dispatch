import { redirect } from 'react-router';

import { APP_SETTINGS } from '@/shared/constants/app-settings';
import { urlUtils } from '@/shared/lib/url-utils';

import { getCurrentUser } from '../api/auth-api';

export function buildLoginRedirect(request: Request) {
  const currentPath = urlUtils.getRequestPath(request);
  const redirectTo =
    currentPath === '/' || currentPath === '/login'
      ? APP_SETTINGS.DEFAULT_PROTECTED_REDIRECT
      : currentPath;
  const searchParams = new URLSearchParams({
    redirectTo
  });

  return redirect(`/?${searchParams.toString()}`);
}

export async function requireUser(request: Request) {
  const user = await getCurrentUser(request);

  if (!user) {
    throw buildLoginRedirect(request);
  }

  return user;
}
