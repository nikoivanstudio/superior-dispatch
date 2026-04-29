import { redirect } from 'react-router';
import type { Route } from './+types/logout';

import { isBackendUnavailableError, signOut } from '../lib/auth.server';

export async function loader() {
  throw redirect('/');
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const result = await signOut(request);

    throw redirect('/', {
      headers: {
        'set-cookie': result.setCookie
      }
    });
  } catch (error) {
    if (isBackendUnavailableError(error)) {
      throw redirect('/');
    }

    throw error;
  }
}

export default function LogoutRoute() {
  return null;
}
