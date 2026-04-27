import type { TerminalFormValues } from '../domain';

export const stateOptions = [
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

export const defaultFormValues: TerminalFormValues = {
  terminalName: '',
  city: '',
  state: 'AL',
  zip: '',
  contactName: '',
  phoneCountryCode: '+1',
  phone: ''
};

export const fieldClassName =
  'h-9 rounded-[4px] border-[#c8cef5] bg-white px-3 text-[16px] text-[#1f2434] shadow-none placeholder:text-[#b5bbd3] focus-visible:border-[#9ea8ea] focus-visible:ring-2 focus-visible:ring-[#dfe4ff]';

export const labelClassName =
  'mb-2 block text-[16px] leading-6 font-medium text-[#25293a]';
