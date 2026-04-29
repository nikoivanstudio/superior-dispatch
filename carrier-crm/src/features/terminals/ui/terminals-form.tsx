import type { TerminalFormValues } from '../domain';
import { ChevronDown, Globe } from 'lucide-react';
import { type ChangeEvent, type FC, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';

import {
  defaultFormValues,
  fieldClassName,
  labelClassName,
  stateOptions
} from '../constants/constants';

type Props = {
  defaultValues?: Partial<TerminalFormValues>;
  isSubmitting?: boolean;
  onCancel?: () => void;
  onSubmit?: (values: TerminalFormValues) => void;
};

export const TerminalsForm: FC<Props> = ({
  defaultValues,
  isSubmitting = false,
  onCancel,
  onSubmit
}) => {
  const [values, setValues] = useState<TerminalFormValues>({
    ...defaultFormValues,
    ...defaultValues
  });

  const handleChange =
    (field: keyof TerminalFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({
        ...current,
        [field]: event.target.value
      }));
    };

  const handleSelectChange =
    (field: keyof TerminalFormValues) => (value: string) => {
      setValues((current) => ({
        ...current,
        [field]: value
      }));
    };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[10px] bg-white shadow-[0_18px_40px_rgba(31,36,52,0.16)]"
    >
      <div className="border-b border-[#eef1f7] px-5 py-4">
        <h2 className="m-0 text-[18px] leading-[1.2] font-semibold tracking-[-0.01em] text-[#171c2d]">
          Add terminal
        </h2>
      </div>

      <div className="space-y-[14px] px-6 pt-5 pb-10">
        <label className="block">
          <span className={labelClassName}>Terminal name</span>
          <Input
            name="terminalName"
            value={values.terminalName}
            onChange={handleChange('terminalName')}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className={labelClassName}>City</span>
          <Input
            name="city"
            value={values.city}
            onChange={handleChange('city')}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className={labelClassName}>State</span>
          <Select
            name="state"
            value={values.state}
            onValueChange={handleSelectChange('state')}
          >
            <SelectTrigger
              className={cn(
                fieldClassName,
                'h-9 w-full justify-between rounded-[4px] px-3 text-[16px] [&_[data-slot=select-value]]:text-[#1f2434]'
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {stateOptions.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <label className="block">
          <span className={labelClassName}>Zip</span>
          <Input
            name="zip"
            value={values.zip}
            onChange={handleChange('zip')}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className={labelClassName}>Contact name</span>
          <Input
            name="contactName"
            value={values.contactName}
            onChange={handleChange('contactName')}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className={labelClassName}>Phone</span>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-[1px] left-[1px] z-10 flex items-center gap-1 rounded-l-[4px] bg-white pl-3 pr-2 text-[#5f6579]">
              <Globe className="size-4 stroke-[1.85]" />
              <span className="text-[14px] leading-none">
                {values.phoneCountryCode}
              </span>
              <ChevronDown className="size-3.5" />
            </div>
            <Input
              name="phone"
              value={values.phone}
              onChange={handleChange('phone')}
              className={cn(fieldClassName, 'pl-[74px]')}
            />
          </div>
        </label>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-[#eef1f7] px-5 py-5">
        <Button
          type="button"
          variant="ghost"
          size={null}
          onClick={onCancel}
          className="h-9 rounded-md px-4 text-[16px] font-semibold text-[#5c6278] hover:bg-transparent hover:text-[#31374a]"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          size={null}
          variant={null}
          className="h-[35px] min-w-[87px] rounded-[4px] bg-[#1f6fe5] px-6 text-[16px] font-semibold text-white hover:bg-[#1462d6]"
        >
          Save
        </Button>
      </div>
    </form>
  );
};
