import { z } from 'zod';

export const userRoleSchema = z.literal([
  'OWNER',
  'DISPATCHER',
  'DRIVER',
  'BILLING',
  'ADMIN',
  'SUPER_ADMIN'
]);

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  passwordHash: z.string(),
  role: userRoleSchema,
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  carsPerMonth: z.string(),
  usdot: z.string(),
  hear: z.string()
});

export const createUserDtoSchema = userSchema
  .omit({ id: true, passwordHash: true, createdAt: true, updatedAt: true })
  .extend({ password: z.string() });

export const updateUserDtoSchema = userSchema
  .omit({ passwordHash: true })
  .partial();
