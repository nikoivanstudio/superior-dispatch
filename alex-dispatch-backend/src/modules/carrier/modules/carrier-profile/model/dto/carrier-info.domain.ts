import { CarrierInfo } from 'generated/prisma/client';
import { z } from 'zod';

export const createCarrierInfoDtoSchema = z.object({
  userId: z.number(),
  name: z.string().optional(),
  address: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  mcNumber: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.email().optional(),
  website: z.string().optional(),
  logo: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.email().optional(),
  terms: z.string().optional()
});

export type CarrierInfoEntity = {
  id: number;
  userId: number;
  name?: string;
  address?: string;
  state?: string;
  city?: string;
  zip?: string;
  country?: string;
  mcNumber?: string;
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
  logo?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  terms?: string;
};

export type CarrierInfoDomain = CarrierInfo;
export type CreateCarrierInfoDto = z.infer<typeof createCarrierInfoDtoSchema>;
export type UpdateCarrierInfoDto = CarrierInfoEntity;
