import { ChevronDown, Globe } from 'lucide-react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

type FactoringFormValues = {
  name: string;
  address: string;
  city: string;
  state: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  factoringFee: string;
};

type Props = {
  onSubmit(args?: FactoringFormValues): unknown | Promise<unknown>;
};

const fieldClassName = cn(
  'h-9 rounded-[4px] border-[#c8cef5] bg-white px-3 text-[16px] text-[#1f2434] shadow-none placeholder:text-[#b5bbd3] focus-visible:border-[#9ea8ea] focus-visible:ring-2 focus-visible:ring-[#dfe4ff]'
);

const labelClassName = cn(
  'mb-2 block text-[17px] leading-[1.2] font-normal tracking-[-0.01em] text-[#1d2234]'
);

const stateOptions = [
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

const defaultValues: FactoringFormValues = {
  name: '',
  address: '',
  city: '',
  state: 'AL',
  email: '',
  phoneCountryCode: '+1',
  phoneNumber: '',
  factoringFee: ''
};

export const FactoringForm: FC<Props> = ({ onSubmit }) => {
  const [values, setValues] = useState<FactoringFormValues>(defaultValues);

  const handleChange =
    (field: keyof FactoringFormValues) =>
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      setValues((current) => ({
        ...current,
        [field]: event.target.value
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-[602px] flex-col rounded-[10px] bg-white px-8 pt-10 pb-8 shadow-[0_0_0_1px_rgba(233,236,245,0.75)]"
    >
      <p className="max-w-[540px] text-left text-[17px] leading-[1.18] font-normal tracking-[-0.01em] text-[#1d2234]">
        Enter the details of your factoring company below to enable the option
        to factor your invoices
      </p>

      <div className="mt-8 flex flex-col gap-[22px]">
        <label className="block">
          <span className={labelClassName}>Name *</span>
          <Input
            value={values.name}
            onChange={handleChange('name')}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className={labelClassName}>Address *</span>
          <Input
            value={values.address}
            onChange={handleChange('address')}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className={labelClassName}>City *</span>
          <Input
            value={values.city}
            onChange={handleChange('city')}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className={labelClassName}>State *</span>
          <div className="relative">
            <select
              value={values.state}
              onChange={handleChange('state')}
              className={cn(
                fieldClassName,
                'w-full appearance-none pr-10 outline-none'
              )}
            >
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#5e6477]" />
          </div>
        </label>

        <label className="block">
          <span className={labelClassName}>Email *</span>
          <Input
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className={labelClassName}>Phone Number *</span>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-[1px] left-[1px] z-10 flex items-center gap-1 rounded-l-[4px] bg-white pl-3 pr-2 text-[#5f6579]">
              <Globe className="size-4 stroke-[1.85]" />
              <span className="text-[14px] leading-none">
                {values.phoneCountryCode}
              </span>
              <ChevronDown className="size-3.5" />
            </div>
            <Input
              value={values.phoneNumber}
              onChange={handleChange('phoneNumber')}
              className={cn(fieldClassName, 'pl-[74px]')}
            />
          </div>
        </label>

        <label className="block">
          <span className={labelClassName}>Factoring Fee (%)</span>
          <Input
            value={values.factoringFee}
            onChange={handleChange('factoringFee')}
            className={fieldClassName}
          />
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
