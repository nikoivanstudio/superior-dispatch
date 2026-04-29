import type { AuthUser } from '../domain';
import { useQuery } from '@tanstack/react-query';
import { useMatches, useRouteLoaderData } from 'react-router';

import { apiClient } from '@/shared/api/api-client';
import { urlUtils } from '@/shared/lib/url-utils';

type ProtectedLayoutLoaderData = {
  user: AuthUser | null;
};

export const useAuth = (): AuthUser | null => {
  const data = useRouteLoaderData('routes/protected-layout') as
    | ProtectedLayoutLoaderData
    | undefined;

  if (data?.user) {
    return data.user;
  }

  const matches = useMatches();

  for (const match of matches) {
    const matchData = match.data as ProtectedLayoutLoaderData | undefined;

    if (matchData?.user) {
      return matchData.user;
    }
  }

  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await apiClient.get<Response>({
        url: `${urlUtils.getBackendBaseUrl()}/auth/me`,
        headers: { accept: 'application/json' },
        withoutParse: true
      });

      if (response.status === 401) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Auth validation failed with status ${response.status}`);
      }

      return (await response.json()) as AuthUser;
    },
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false
  });

  return query.data ?? null;
};
