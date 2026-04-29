import { DriverAppSettings } from 'generated/prisma/client';
import { z } from 'zod';

export const createDriverAppDtoSchema = z.object({
  userId: z.number(),
  hidePayment: z.boolean().optional(),
  disableCustomer: z.boolean().optional(),
  driverPay: z.boolean().optional()
});

export type DriverAppEntity = {
  id: number;
  userId: number;
  hidePayment?: boolean;
  disableCustomer?: boolean;
  driverPay?: boolean;
};

export type DriverAppDomain = DriverAppSettings;
export type CreateDriverAppDto = z.infer<typeof createDriverAppDtoSchema>;
export type UpdateDriverAppDto = DriverAppEntity;
