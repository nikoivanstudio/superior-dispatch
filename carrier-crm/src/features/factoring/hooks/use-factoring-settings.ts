import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/features/auth';

import { factoringApi } from '../api/factoring-api';
import {
  mapFactoringToFormValues,
  type FactoringFormValues
} from '../domain';

export const useFactoringSettings = () => {
  const user = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...factoringApi.baseKey, user?.id ?? 'anonymous'],
    queryFn: () => factoringApi.get(),
    enabled: !!user?.id,
    refetchOnWindowFocus: false
  });

  const mutation = useMutation({
    mutationFn: async (values: FactoringFormValues) => {
      if (!user?.id) {
        throw new Error('Unable to resolve current user');
      }

      return factoringApi.upsert({
        userId: user.id,
        companyName: values.name || undefined,
        invoiceEmail: values.email || undefined
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...factoringApi.baseKey, user?.id ?? 'anonymous']
      });
    }
  });

  return {
    values: mapFactoringToFormValues(query.data),
    isLoading: query.isLoading,
    isSaving: mutation.isPending,
    submit: mutation.mutate
  };
};
