export type FactoringEntity = {
  id: number;
  userId: number;
  attachInvoices?: boolean;
  deliveryDates?: boolean;
  invoiceEmail?: string;
  companyName?: string;
};

export type FactoringFormValues = {
  name: string;
  address: string;
  city: string;
  state: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  factoringFee: string;
};

export const factoringStateOptions = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA'
] as const;

export const defaultFactoringFormValues: FactoringFormValues = {
  name: '',
  address: '',
  city: '',
  state: 'AL',
  email: '',
  phoneCountryCode: '+1',
  phoneNumber: '',
  factoringFee: ''
};

export const mapFactoringToFormValues = (
  settings?: FactoringEntity | null
): FactoringFormValues => ({
  ...defaultFactoringFormValues,
  name: settings?.companyName ?? defaultFactoringFormValues.name,
  email: settings?.invoiceEmail ?? defaultFactoringFormValues.email
});
