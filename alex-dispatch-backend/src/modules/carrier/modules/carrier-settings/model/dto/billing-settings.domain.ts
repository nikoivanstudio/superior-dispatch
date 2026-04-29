import { BillingSettings } from 'generated/prisma/client';
import { z } from 'zod';

export const createBillingSettingsDtoSchema = z.object({
  userId: z.number(),
  attachInvoices: z.boolean().optional(),
  deliveryDates: z.boolean().optional(),
  invoiceEmail: z.email().optional(),
  companyName: z.string().optional()
});

export type BillingSettingsEntity = {
  id: number;
  userId: number;
  attachInvoices?: boolean;
  deliveryDates?: boolean;
  invoiceEmail?: string;
  companyName?: string;
};

export type BillingSettingsDomain = BillingSettings;
export type CreateBillingSettingsDto = z.infer<
  typeof createBillingSettingsDtoSchema
>;
export type UpdateBillingSettingsDto = BillingSettingsEntity;
