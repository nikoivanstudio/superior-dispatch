import { createContext, redirect } from 'react-router';

import { getBackendBaseUrl } from './env.server';

export type AuthUser = {
  id: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string | null;
};

export const authUserContext = createContext<AuthUser | null>(null);

const DEFAULT_PROTECTED_REDIRECT = '/loads';

function getRequestPath(request: Request) {
  const url = new URL(request.url);
  return `${url.pathname}${url.search}`;
}

function getErrorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    const message = (payload as { message?: unknown }).message;

    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  return fallback;
}

function getSetCookieHeader(response: Response) {
  const setCookieHeader = response.headers.get('set-cookie');

  if (!setCookieHeader) {
    throw new Error('Expected Set-Cookie header from auth backend');
  }

  return setCookieHeader;
}

async function readErrorPayload(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export function sanitizeRedirectTarget(target: string | null | undefined) {
  if (!target || !target.startsWith('/') || target.startsWith('//')) {
    return null;
  }

  return target;
}

export function buildLoginRedirect(request: Request) {
  const currentPath = getRequestPath(request);
  const redirectTo =
    currentPath === '/' || currentPath === '/login'
      ? DEFAULT_PROTECTED_REDIRECT
      : currentPath;
  const searchParams = new URLSearchParams({
    redirectTo
  });

  return redirect(`/?${searchParams.toString()}`);
}

export async function getCurrentUser(request: Request): Promise<AuthUser | null> {
  const cookieHeader = request.headers.get('cookie');

  if (!cookieHeader) {
    return null;
  }

  const response = await fetch(`${getBackendBaseUrl()}/auth/me`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      cookie: cookieHeader
    }
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Auth validation failed with status ${response.status}`);
  }

  return (await response.json()) as AuthUser;
}

export async function requireUser(request: Request) {
  const user = await getCurrentUser(request);

  if (!user) {
    throw buildLoginRedirect(request);
  }

  return user;
}

export function getPostLoginRedirect(request: Request) {
  const url = new URL(request.url);

  return (
    sanitizeRedirectTarget(url.searchParams.get('redirectTo')) ??
    DEFAULT_PROTECTED_REDIRECT
  );
}

export async function signIn({
  username,
  password
}: {
  username: string;
  password: string;
}) {
  const response = await fetch(`${getBackendBaseUrl()}/signin`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const payload = await readErrorPayload(response);

    return {
      ok: false as const,
      error:
        response.status === 401
          ? 'Invalid email or password'
          : getErrorMessage(payload, 'Unable to sign in right now')
    };
  }

  return {
    ok: true as const,
    setCookie: getSetCookieHeader(response)
  };
}

export async function signOut(request: Request) {
  const response = await fetch(`${getBackendBaseUrl()}/logout`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      cookie: request.headers.get('cookie') ?? ''
    }
  });

  if (!response.ok) {
    throw new Error(`Logout failed with status ${response.status}`);
  }

  return {
    setCookie: getSetCookieHeader(response)
  };
}
