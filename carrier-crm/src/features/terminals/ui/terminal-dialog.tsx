import { type FC, useState } from 'react';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/shared/ui/dialog';

import { TerminalsForm } from './terminals-form';

type Props = {
  onSubmit(data?: unknown): boolean | Promise<boolean> | void;
};

export const TerminalDialog: FC<Props> = ({ onSubmit }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const onOpenChange = (value: boolean) => setOpen(value);

  const handleSubmit = async (values: unknown) => {
    const result = await onSubmit(values);

    if (!result) return;

    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size={null}
          variant={null}
          onClick={() => onOpenChange(true)}
          className="h-[42px] min-w-[160px] rounded-[6px] bg-[#176be8] px-7 text-[18px] font-semibold text-white shadow-none transition-colors hover:bg-[#0f57c2]"
        >
          Add Terminal
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[520px] border-none bg-transparent p-0 shadow-none ring-0"
        showCloseButton={false}
      >
        <TerminalsForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};
