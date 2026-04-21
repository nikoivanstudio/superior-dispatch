import { z } from 'zod';

export const signinUserSchema = z.object({
  username: z.email({
    error: 'Username is required',
  }),
  password: z.string().min(5, 'Must be at least 5 characters'),
});
