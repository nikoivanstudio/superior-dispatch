import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/features/auth';

import { driverAppApi } from '../api/driver-app-api';
import {
  mapDriverAppSettingsToFormValues,
  type DriverAppFormValues
} from '../domain';

export const useDriverAppSettings = () => {
  const user = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...driverAppApi.baseKey, user?.id ?? 'anonymous'],
    queryFn: () => driverAppApi.get(),
    enabled: !!user?.id,
    refetchOnWindowFocus: false
  });

  const mutation = useMutation({
    mutationFn: async (values: DriverAppFormValues) => {
      if (!user?.id) {
        throw new Error('Unable to resolve current user');
      }

      return driverAppApi.upsert({
        userId: user.id,
        hidePayment: values.hidePaymentInformation,
        disableCustomer: values.disableCustomerNotAvailable,
        driverPay: values.enableDriverPayField
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...driverAppApi.baseKey, user?.id ?? 'anonymous']
      });
    }
  });

  return {
    values: mapDriverAppSettingsToFormValues(query.data),
    isLoading: query.isLoading,
    error: query.error,
    isSaving: mutation.isPending,
    submit: mutation.mutate
  };
};
