export type BillingSettingsEntity = {
  id: number;
  userId: number;
  attachInvoices?: boolean;
  deliveryDates?: boolean;
  invoiceEmail?: string;
  companyName?: string;
};

export type BillingFormValues = {
  attachBolToInvoices: boolean;
  addPickupDeliveryDatesToBol: boolean;
  bccEmail: string;
};

export const defaultBillingFormValues: BillingFormValues = {
  attachBolToInvoices: true,
  addPickupDeliveryDatesToBol: true,
  bccEmail: ''
};

export const mapBillingSettingsToFormValues = (
  settings?: BillingSettingsEntity | null
): BillingFormValues => ({
  attachBolToInvoices:
    settings?.attachInvoices ?? defaultBillingFormValues.attachBolToInvoices,
  addPickupDeliveryDatesToBol:
    settings?.deliveryDates ??
    defaultBillingFormValues.addPickupDeliveryDatesToBol,
  bccEmail: settings?.invoiceEmail ?? defaultBillingFormValues.bccEmail
});
