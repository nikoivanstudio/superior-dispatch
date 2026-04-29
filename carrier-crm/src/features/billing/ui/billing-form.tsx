import type { ChangeEvent, FC, FormEvent } from 'react';
import { useEffect, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import { type BillingFormValues, defaultBillingFormValues } from '../domain';

type Props = {
  defaultValues?: Partial<BillingFormValues>;
  onSubmit(args?: BillingFormValues): unknown | Promise<unknown>;
};

const checkboxClassName = cn(
  'mt-0.5 size-[26px] rounded-[4px] border-[#c5cbe5] bg-[#f3f5ff] data-[state=checked]:border-[#176be8] data-[state=checked]:bg-[#176be8] focus-visible:ring-2 focus-visible:ring-[#d9e6ff] focus-visible:ring-offset-2'
);

const inputClassName = cn(
  'h-9 rounded-[4px] border-[#c8cef5] bg-white px-3 text-[16px] text-[#1f2434] shadow-none placeholder:text-[#b5bbd3] focus-visible:border-[#9ea8ea] focus-visible:ring-2 focus-visible:ring-[#dfe4ff]'
);

export const BillingForm: FC<Props> = ({ defaultValues, onSubmit }) => {
  const [values, setValues] = useState<BillingFormValues>({
    ...defaultBillingFormValues,
    ...defaultValues
  });

  useEffect(() => {
    setValues({
      ...defaultBillingFormValues,
      ...defaultValues
    });
  }, [defaultValues]);

  const handleCheckboxChange =
    (
      field: keyof Pick<
        BillingFormValues,
        'attachBolToInvoices' | 'addPickupDeliveryDatesToBol'
      >
    ) =>
    (checked: boolean) => {
      setValues((current) => ({
        ...current,
        [field]: checked
      }));
    };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({
      ...current,
      bccEmail: event.target.value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto flex w-full max-w-[602px] flex-col rounded-[10px] bg-white px-8 pt-9 pb-8 shadow-[0_0_0_1px_rgba(233,236,245,0.75)]'
    >
      <FieldGroup className='gap-[23px]'>
        <Field orientation='horizontal' className='gap-3.5'>
          <Checkbox
            id='attach-bol-to-invoices'
            checked={values.attachBolToInvoices}
            onCheckedChange={(checked) =>
              handleCheckboxChange('attachBolToInvoices')(checked === true)
            }
            className={checkboxClassName}
          />
          <FieldContent className='text-left'>
            <FieldLabel
              htmlFor='attach-bol-to-invoices'
              className='text-[17px] leading-[1.2] font-normal tracking-[-0.01em] text-[#1d2234]'
            >
              Attach BOL to Invoices
            </FieldLabel>
          </FieldContent>
        </Field>

        <Field orientation='horizontal' className='gap-3.5'>
          <Checkbox
            id='add-pickup-delivery-dates-to-bol'
            checked={values.addPickupDeliveryDatesToBol}
            onCheckedChange={(checked) =>
              handleCheckboxChange('addPickupDeliveryDatesToBol')(
                checked === true
              )
            }
            className={checkboxClassName}
          />
          <FieldContent className='text-left'>
            <FieldLabel
              htmlFor='add-pickup-delivery-dates-to-bol'
              className='text-[17px] leading-[1.2] font-normal tracking-[-0.01em] text-[#1d2234]'
            >
              Add pickup/delivery dates to BOL
            </FieldLabel>
          </FieldContent>
        </Field>

        <Field className='gap-2.5'>
          <FieldLabel
            htmlFor='bcc-email'
            className='text-[17px] leading-[1.2] font-normal tracking-[-0.01em] text-[#1d2234]'
          >
            Send a copy of an invoice to this (BCC) email
          </FieldLabel>
          <Input
            id='bcc-email'
            type='email'
            value={values.bccEmail}
            onChange={handleEmailChange}
            className={inputClassName}
          />
          <FieldDescription className='text-[15px] leading-[1.5] text-[#8c92aa]'>
            Receive a blind copy (or &quot;BCC&quot;) of an invoice. Enter a
            single email address.
          </FieldDescription>
        </Field>
      </FieldGroup>

      <p className='mt-6 text-[15px] leading-[1.5] font-normal tracking-[-0.01em] text-[#8c92aa]'>
        <button
          type='button'
          className='font-semibold text-[#176be8] transition-colors hover:text-[#0f57c2]'
        >
          Learn more...
        </button>
      </p>

      <div className='mt-8 flex justify-end'>
        <Button
          type='submit'
          size={null}
          variant={null}
          className='h-[36px] min-w-[164px] rounded-[4px] bg-[#176be8] px-6 text-[17px] font-semibold text-white shadow-none transition-colors hover:bg-[#0f57c2]'
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};
