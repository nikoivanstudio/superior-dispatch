import { z } from 'zod';

export const userDtoSchema = z.object({
  id: z.number(),
  email: z.email(),
  passwordHash: z.string(),
  role: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable().optional(),
  phone: z.string().nullable().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional()
});

export const createUserDtoSchema = userDtoSchema
  .omit({
    id: true,
    passwordHash: true,
    createdAt: true,
    role: true
  })
  .extend({ password: z.string() });
