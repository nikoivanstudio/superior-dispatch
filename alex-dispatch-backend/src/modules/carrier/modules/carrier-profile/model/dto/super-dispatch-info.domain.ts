import { SuperDispatchInfo } from 'generated/prisma/client';
import { z } from 'zod';

export const createSuperDispatchInfoDtoSchema = z.object({
  userId: z.number(),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  carrierId: z.number().optional(),
  defaultDriverPassword: z.string().optional(),
  enableSuperDispatch: z.boolean().optional()
});

export type SuperDispatchInfoEntity = {
  id: number;
  userId: number;
  clientId?: string;
  clientSecret?: string;
  carrierId?: number;
  defaultDriverPassword?: string;
  enableSuperDispatch?: boolean;
};

export type SuperDispatchInfoDomain = SuperDispatchInfo;
export type CreateSuperDispatchInfoDto = z.infer<
  typeof createSuperDispatchInfoDtoSchema
>;
export type UpdateSuperDispatchInfoDto = SuperDispatchInfoEntity;
