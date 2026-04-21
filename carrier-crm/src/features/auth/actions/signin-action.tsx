import { type ActionFunctionArgs, redirect } from 'react-router';

import { urlUtils } from '@/shared/lib/url-utils';

import { signIn } from '../api/auth-api';

export async function signinAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = String(formData.get('username') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const redirectTo =
    urlUtils.sanitizeRedirectTarget(String(formData.get('redirectTo') ?? '')) ??
    '/loads';

  if (!username || !password) {
    return {
      error: 'Email and password are required',
      values: { username, redirectTo }
    };
  }

  const result = await signIn({ username, password });

  if (!result.ok) {
    return {
      error: result.error,
      values: { username, redirectTo }
    };
  }

  throw redirect(redirectTo, {
    headers: {
      'set-cookie': result.setCookie
    }
  });
}
