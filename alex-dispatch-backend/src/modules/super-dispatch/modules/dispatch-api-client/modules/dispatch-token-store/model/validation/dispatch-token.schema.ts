import z from 'zod';

export const stringifiedDispatchTokenSchema = z.object({
  access_token: z.string().min(10),
  token_type: z.string().min(5),
  expires_in: z.string().min(3),
  scope: z.string().min(5),
});

export const dispatchTokenSchema = stringifiedDispatchTokenSchema.extend({
  expires_in: z.number(),
});
