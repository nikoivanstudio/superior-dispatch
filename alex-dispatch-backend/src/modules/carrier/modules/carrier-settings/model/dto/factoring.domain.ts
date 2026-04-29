import { Factoring } from 'generated/prisma/client';
import { z } from 'zod';

export const createFactoringDtoSchema = z.object({
  userId: z.number(),
  attachInvoices: z.boolean().optional(),
  deliveryDates: z.boolean().optional(),
  invoiceEmail: z.email().optional(),
  companyName: z.string().optional()
});

export type FactoringEntity = {
  id: number;
  userId: number;
  attachInvoices?: boolean;
  deliveryDates?: boolean;
  invoiceEmail?: string;
  companyName?: string;
};

export type FactoringDomain = Factoring;
export type CreateFactoringDto = z.infer<typeof createFactoringDtoSchema>;
export type UpdateFactoringDto = FactoringEntity;
