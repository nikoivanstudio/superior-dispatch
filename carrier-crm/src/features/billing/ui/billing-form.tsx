import { Check } from 'lucide-react';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

type BillingFormValues = {
  attachBolToInvoices: boolean;
  addPickupDeliveryDatesToBol: boolean;
  bccEmail: string;
};

type Props = {
  onSubmit(args?: BillingFormValues): unknown | Promise<unknown>;
};

const checkboxClassName = cn('peer sr-only');

const inputClassName = cn(
  'h-9 rounded-[4px] border-[#c8cef5] bg-white px-3 text-[16px] text-[#1f2434] shadow-none placeholder:text-[#b5bbd3] focus-visible:border-[#9ea8ea] focus-visible:ring-2 focus-visible:ring-[#dfe4ff]'
);

const defaultValues: BillingFormValues = {
  attachBolToInvoices: true,
  addPickupDeliveryDatesToBol: true,
  bccEmail: ''
};

export const BillingForm: FC<Props> = ({ onSubmit }) => {
  const [values, setValues] = useState<BillingFormValues>(defaultValues);

  const handleCheckboxChange =
    (field: keyof Pick<
      BillingFormValues,
      'attachBolToInvoices' | 'addPickupDeliveryDatesToBol'
    >) =>
    (event: FormEvent<HTMLInputElement>) => {
      const { checked } = event.currentTarget;

      setValues((current) => ({
        ...current,
        [field]: checked
      }));
    };

  const handleEmailChange = (event: FormEvent<HTMLInputElement>) => {
    setValues((current) => ({
      ...current,
      bccEmail: event.currentTarget.value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-[602px] flex-col rounded-[10px] bg-white px-8 pt-9 pb-8 shadow-[0_0_0_1px_rgba(233,236,245,0.75)]"
    >
      <div className="flex flex-col gap-[23px]">
        <label className="flex cursor-pointer items-start gap-3.5">
          <span className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={values.attachBolToInvoices}
              onChange={handleCheckboxChange('attachBolToInvoices')}
              className={checkboxClassName}
            />
            <span className="flex size-[26px] items-center justify-center rounded-[4px] border border-[#c5cbe5] bg-[#f3f5ff] transition-colors peer-checked:border-[#176be8] peer-checked:bg-[#176be8] peer-focus-visible:ring-2 peer-focus-visible:ring-[#d9e6ff] peer-focus-visible:ring-offset-2">
              <Check
                className="size-[15px] text-white opacity-0 transition-opacity peer-checked:opacity-100"
                strokeWidth={3.2}
              />
            </span>
          </span>

          <span className="pt-0.5 text-left text-[17px] leading-[1.2] font-normal tracking-[-0.01em] text-[#1d2234]">
            Attach BOL to Invoices
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3.5">
          <span className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={values.addPickupDeliveryDatesToBol}
              onChange={handleCheckboxChange('addPickupDeliveryDatesToBol')}
              className={checkboxClassName}
            />
            <span className="flex size-[26px] items-center justify-center rounded-[4px] border border-[#c5cbe5] bg-[#f3f5ff] transition-colors peer-checked:border-[#176be8] peer-checked:bg-[#176be8] peer-focus-visible:ring-2 peer-focus-visible:ring-[#d9e6ff] peer-focus-visible:ring-offset-2">
              <Check
                className="size-[15px] text-white opacity-0 transition-opacity peer-checked:opacity-100"
                strokeWidth={3.2}
              />
            </span>
          </span>

          <span className="pt-0.5 text-left text-[17px] leading-[1.2] font-normal tracking-[-0.01em] text-[#1d2234]">
            Add pickup/delivery dates to BOL
          </span>
        </label>

        <label className="block">
          <span className="mb-2.5 block text-[17px] leading-[1.2] font-normal tracking-[-0.01em] text-[#1d2234]">
            Send a copy of an invoice to this (BCC) email
          </span>
          <Input
            type="email"
            value={values.bccEmail}
            onChange={handleEmailChange}
            className={inputClassName}
          />
        </label>
      </div>

      <p className="mt-6 text-[15px] leading-[1.5] font-normal tracking-[-0.01em] text-[#8c92aa]">
        Receive a blind copy (or &quot;BCC&quot;) of an invoice. Enter a single email
        address.{' '}
        <button
          type="button"
          className="font-semibold text-[#176be8] transition-colors hover:text-[#0f57c2]"
        >
          Learn more...
        </button>
      </p>

      <div className="mt-8 flex justify-end">
        <Button
          type="submit"
          size={null}
          variant={null}
          className="h-[36px] min-w-[164px] rounded-[4px] bg-[#176be8] px-6 text-[17px] font-semibold text-white shadow-none transition-colors hover:bg-[#0f57c2]"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};
