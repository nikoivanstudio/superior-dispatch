import type { AuthUser } from '../../../../app/lib/auth.server';

import { apiClient } from '@/shared/api/api-client';
import { headers } from '@/shared/constants/api-constants';
import { apiUtils } from '@/shared/lib/api-utils';
import { backendUtils } from '@/shared/lib/backend-utils';
import { urlUtils } from '@/shared/lib/url-utils';

export async function signIn({
  username,
  password
}: {
  username: string;
  password: string;
}) {
  let response: Response;

  try {
    response = await apiClient.post<Response>({
      url: `${urlUtils.getBackendBaseUrl()}/signin`,
      headers: headers.json,
      body: JSON.stringify({ username, password }),
      withoutParse: true
    });
  } catch (error) {
    if (apiUtils.isBackendUnavailableError(error)) {
      return {
        ok: false as const,
        error: 'Sign in is temporarily unavailable while backend is offline'
      };
    }

    throw error;
  }

  if (!response.ok) {
    const payload = await apiUtils.readErrorPayload(response);

    return {
      ok: false as const,
      error:
        response.status === 401
          ? 'Invalid email or password'
          : apiUtils.getErrorMessage(payload, 'Unable to sign in right now')
    };
  }

  return {
    ok: true as const,
    setCookie: backendUtils.getSetCookieHeader(response)
  };
}

export async function getCurrentUser(
  request: Request
): Promise<AuthUser | null> {
  const cookieHeader = request.headers.get('cookie');

  if (!cookieHeader) {
    return null;
  }
  const response = await apiClient.get<Response>({
    url: `${urlUtils.getBackendBaseUrl()}/auth/me`,
    headers: { accept: 'application/json', cookie: cookieHeader },
    withoutParse: true
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Auth validation failed with status ${response.status}`);
  }

  return (await response.json()) as AuthUser;
}
