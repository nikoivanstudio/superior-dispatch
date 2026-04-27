import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

type DriverAppFormValues = {
  hidePaymentInformation: boolean;
  disableCustomerNotAvailable: boolean;
  enableDriverPayField: boolean;
};

type Props = {
  onSubmit(args?: DriverAppFormValues): unknown | Promise<unknown>;
};

const checkboxClassName = cn(
  'peer sr-only'
);

const defaultValues: DriverAppFormValues = {
  hidePaymentInformation: false,
  disableCustomerNotAvailable: false,
  enableDriverPayField: false
};

export const DriverAppForm: FC<Props> = ({ onSubmit }) => {
  const [values, setValues] = useState<DriverAppFormValues>(defaultValues);

  const handleChange =
    (field: keyof DriverAppFormValues) =>
    (event: FormEvent<HTMLInputElement>) => {
      const { checked } = event.currentTarget;

      setValues((current) => ({
        ...current,
        [field]: checked
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-[602px] rounded-[10px] bg-white px-8 py-11 shadow-[0_0_0_1px_rgba(233,236,245,0.75)]"
    >
      <div className="space-y-7">
        <label className="flex cursor-pointer items-start gap-3.5">
          <span className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={values.hidePaymentInformation}
              onChange={handleChange('hidePaymentInformation')}
              className={checkboxClassName}
            />
            <span className="flex size-[26px] items-center justify-center rounded-[4px] border border-[#c5cbe5] bg-[#f3f5ff] transition-colors peer-checked:border-[#176be8] peer-checked:bg-[#176be8] peer-focus-visible:ring-2 peer-focus-visible:ring-[#d9e6ff] peer-focus-visible:ring-offset-2">
              <Check
                className="size-[15px] text-white opacity-0 transition-opacity peer-checked:opacity-100"
                strokeWidth={3.2}
              />
            </span>
          </span>

          <span className="space-y-3 text-left">
            <span className="block text-[17px] leading-[1.15] font-normal tracking-[-0.01em] text-[#1d2234]">
              Hide Payment Information on Driver apps (will show price for
              payment terms: COD, COP and CKOD)
            </span>
            <span className="block text-[16px] leading-[1.25] font-normal tracking-[-0.01em] text-[#25293a]">
              This works when Fleet Driver Mode is checked.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3.5">
          <span className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={values.disableCustomerNotAvailable}
              onChange={handleChange('disableCustomerNotAvailable')}
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
            Disable Customer not Available button on the Driver App
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3.5">
          <span className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={values.enableDriverPayField}
              onChange={handleChange('enableDriverPayField')}
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
            Enable Driver Pay field
          </span>
        </label>
      </div>

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
