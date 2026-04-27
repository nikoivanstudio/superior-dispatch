import type { FC, FormEvent } from 'react';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

type NotificationsFormValues = {
  notificationEmails: string;
  deliveryConfirmationEmails: string;
};

type Props = {
  onSubmit(args?: NotificationsFormValues): unknown | Promise<unknown>;
};

const fieldClassName = cn(
  'h-9 rounded-[4px] border-[#c8cef5] bg-white px-3 text-[16px] text-[#1f2434] shadow-none placeholder:text-[#b5bbd3] focus-visible:border-[#9ea8ea] focus-visible:ring-2 focus-visible:ring-[#dfe4ff]'
);

const labelClassName = cn(
  'mb-2 block text-[17px] leading-[1.2] font-normal tracking-[-0.01em] text-[#1d2234]'
);

const defaultValues: NotificationsFormValues = {
  notificationEmails: '',
  deliveryConfirmationEmails: ''
};

export const NotificationsForm: FC<Props> = ({ onSubmit }) => {
  const [values, setValues] = useState<NotificationsFormValues>(defaultValues);

  const handleChange =
    (field: keyof NotificationsFormValues) =>
    (event: FormEvent<HTMLInputElement>) => {
      setValues((current) => ({
        ...current,
        [field]: event.currentTarget.value
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-[602px] flex-col rounded-[10px] bg-white px-8 pt-12 pb-8 shadow-[0_0_0_1px_rgba(233,236,245,0.75)]"
    >
      <div className="flex flex-col gap-7">
        <label className="block">
          <span className={labelClassName}>Notification emails</span>
          <Input
            value={values.notificationEmails}
            onChange={handleChange('notificationEmails')}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className={labelClassName}>Delivery confirmation emails</span>
          <Input
            value={values.deliveryConfirmationEmails}
            onChange={handleChange('deliveryConfirmationEmails')}
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
