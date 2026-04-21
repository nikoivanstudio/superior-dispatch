import { z } from 'zod';

export const signupDriverSchema = z.object({
  email: z.email(),
  password: z.string()
});
