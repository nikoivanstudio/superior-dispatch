import { z } from 'zod';

export const DispatchStatusSchema = z.enum([
  'new',
  'assigned',
  'in_progress',
  'done',
  'cancelled'
]);

export const CoordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180)
});

export const DispatchSchema = z.object({
  id: z.string().uuid(),
  orderNumber: z.string().min(1),
  status: DispatchStatusSchema,
  customerName: z.string().min(1),
  pickup: CoordinatesSchema,
  dropoff: CoordinatesSchema,
  createdAt: z.string().datetime()
});

export const CreateDispatchInputSchema = DispatchSchema.omit({
  id: true,
  createdAt: true,
  status: true
});

export type DispatchStatus = z.infer<typeof DispatchStatusSchema>;
export type Coordinates = z.infer<typeof CoordinatesSchema>;
export type Dispatch = z.infer<typeof DispatchSchema>;
export type CreateDispatchInput = z.infer<typeof CreateDispatchInputSchema>;
