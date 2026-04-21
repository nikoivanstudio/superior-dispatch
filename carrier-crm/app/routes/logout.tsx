import { redirect } from 'react-router';
import type { Route } from './+types/logout';

import { signOut } from '../lib/auth.server';

export async function loader() {
  throw redirect('/');
}

export async function action({ request }: Route.ActionArgs) {
  const result = await signOut(request);

  throw redirect('/', {
    headers: {
      'set-cookie': result.setCookie
    }
  });
}

export default function LogoutRoute() {
  return null;
}
