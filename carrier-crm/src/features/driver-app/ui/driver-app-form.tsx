import type { FC, FormEvent } from 'react';
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

import {
  defaultDriverAppFormValues,
  type DriverAppFormValues
} from '../domain';

type Props = {
  defaultValues?: Partial<DriverAppFormValues>;
  onSubmit(args?: DriverAppFormValues): unknown | Promise<unknown>;
};

const checkboxClassName = cn(
  'mt-0.5 size-[26px] rounded-[4px] border-[#c5cbe5] bg-[#f3f5ff] data-[state=checked]:border-[#176be8] data-[state=checked]:bg-[#176be8] focus-visible:ring-2 focus-visible:ring-[#d9e6ff] focus-visible:ring-offset-2'
);

export const DriverAppForm: FC<Props> = ({ defaultValues, onSubmit }) => {
  const [values, setValues] = useState<DriverAppFormValues>({
    ...defaultDriverAppFormValues,
    ...defaultValues
  });

  useEffect(() => {
    setValues({
      ...defaultDriverAppFormValues,
      ...defaultValues
    });
  }, [defaultValues]);

  const handleChange =
    (field: keyof DriverAppFormValues) =>
    (checked: boolean) => {
      setValues((current) => ({
        ...current,
        [field]: checked
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-[602px] rounded-[10px] bg-white px-8 py-11 shadow-[0_0_0_1px_rgba(233,236,245,0.75)]"
    >
      <FieldGroup className="gap-7">
        <Field orientation="horizontal" className="gap-3.5">
          <Checkbox
            id="hide-payment-information"
            checked={values.hidePaymentInformation}
            onCheckedChange={(checked) =>
              handleChange('hidePaymentInformation')(checked === true)
            }
            className={checkboxClassName}
          />
          <FieldContent className="gap-3 text-left">
            <FieldLabel
              htmlFor="hide-payment-information"
              className="text-[17px] leading-[1.15] font-normal tracking-[-0.01em] text-[#1d2234]"
            >
              Hide Payment Information on Driver apps (will show price for
              payment terms: COD, COP and CKOD)
            </FieldLabel>
            <FieldDescription className="text-[16px] leading-[1.25] tracking-[-0.01em] text-[#25293a]">
              This works when Fleet Driver Mode is checked.
            </FieldDescription>
          </FieldContent>
        </Field>

        <Field orientation="horizontal" className="gap-3.5">
          <Checkbox
            id="disable-customer-not-available"
            checked={values.disableCustomerNotAvailable}
            onCheckedChange={(checked) =>
              handleChange('disableCustomerNotAvailable')(checked === true)
            }
            className={checkboxClassName}
          />
          <FieldContent className="text-left">
            <FieldLabel
              htmlFor="disable-customer-not-available"
              className="text-[17px] leading-[1.2] font-normal tracking-[-0.01em] text-[#1d2234]"
            >
              Disable Customer not Available button on the Driver App
            </FieldLabel>
          </FieldContent>
        </Field>

        <Field orientation="horizontal" className="gap-3.5">
          <Checkbox
            id="enable-driver-pay-field"
            checked={values.enableDriverPayField}
            onCheckedChange={(checked) =>
              handleChange('enableDriverPayField')(checked === true)
            }
            className={checkboxClassName}
          />
          <FieldContent className="text-left">
            <FieldLabel
              htmlFor="enable-driver-pay-field"
              className="text-[17px] leading-[1.2] font-normal tracking-[-0.01em] text-[#1d2234]"
            >
              Enable Driver Pay field
            </FieldLabel>
          </FieldContent>
        </Field>
      </FieldGroup>

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
