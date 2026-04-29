import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../../auth';
import { billingApi } from '../api/billing-api';
import {
  type BillingFormValues,
  mapBillingSettingsToFormValues
} from '../domain';

export const useBillingSettings = () => {
  const user = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...billingApi.baseKey, user?.id ?? 'anonymous'],
    queryFn: () => billingApi.get(),
    enabled: !!user?.id,
    refetchOnWindowFocus: false
  });

  const mutation = useMutation({
    mutationFn: async (values: BillingFormValues) => {
      if (!user?.id) {
        throw new Error('Unable to resolve current user');
      }

      return billingApi.upsert({
        userId: user.id,
        attachInvoices: values.attachBolToInvoices,
        deliveryDates: values.addPickupDeliveryDatesToBol,
        invoiceEmail: values.bccEmail || undefined
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...billingApi.baseKey, user?.id ?? 'anonymous']
      });
    }
  });

  return {
    values: mapBillingSettingsToFormValues(query.data),
    isLoading: query.isLoading,
    error: query.error,
    isSaving: mutation.isPending,
    submit: mutation.mutate
  };
};
