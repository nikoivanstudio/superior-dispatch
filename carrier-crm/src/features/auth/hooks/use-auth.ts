import type { AuthUser } from '../domain';
import { useRouteLoaderData } from 'react-router';

type ProtectedLayoutLoaderData = {
  user: AuthUser | null;
};

export const useAuth = (): AuthUser | null => {
  const data = useRouteLoaderData('routes/protected-layout') as
    | ProtectedLayoutLoaderData
    | undefined;

  if (!data?.user) {
    return null;
  }

  return data.user;
};
