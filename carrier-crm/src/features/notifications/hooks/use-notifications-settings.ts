import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/features/auth';

import { notificationsApi } from '../api/notifications-api';
import {
  mapNotificationsToFormValues,
  type NotificationsFormValues
} from '../domain';

export const useNotificationsSettings = () => {
  const user = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...notificationsApi.baseKey, user?.id ?? 'anonymous'],
    queryFn: () => notificationsApi.get(),
    enabled: !!user?.id,
    refetchOnWindowFocus: false
  });

  const mutation = useMutation({
    mutationFn: async (values: NotificationsFormValues) => {
      if (!user?.id) {
        throw new Error('Unable to resolve current user');
      }

      return notificationsApi.upsert({
        userId: user.id,
        notificationsEmail: values.notificationEmails || undefined,
        deliveryConfirmationsEmail:
          values.deliveryConfirmationEmails || undefined
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...notificationsApi.baseKey, user?.id ?? 'anonymous']
      });
    }
  });

  return {
    values: mapNotificationsToFormValues(query.data),
    isLoading: query.isLoading,
    isSaving: mutation.isPending,
    submit: mutation.mutate
  };
};
