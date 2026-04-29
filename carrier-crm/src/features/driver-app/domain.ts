export type DriverAppSettingsEntity = {
  id: number;
  userId: number;
  hidePayment?: boolean;
  disableCustomer?: boolean;
  driverPay?: boolean;
};

export type DriverAppFormValues = {
  hidePaymentInformation: boolean;
  disableCustomerNotAvailable: boolean;
  enableDriverPayField: boolean;
};

export const defaultDriverAppFormValues: DriverAppFormValues = {
  hidePaymentInformation: false,
  disableCustomerNotAvailable: false,
  enableDriverPayField: false
};

export const mapDriverAppSettingsToFormValues = (
  settings?: DriverAppSettingsEntity | null
): DriverAppFormValues => ({
  hidePaymentInformation:
    settings?.hidePayment ??
    defaultDriverAppFormValues.hidePaymentInformation,
  disableCustomerNotAvailable:
    settings?.disableCustomer ??
    defaultDriverAppFormValues.disableCustomerNotAvailable,
  enableDriverPayField:
    settings?.driverPay ?? defaultDriverAppFormValues.enableDriverPayField
});
