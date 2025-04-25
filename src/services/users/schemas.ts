import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email_address: z.string(),
});

export const deleteUserRequestSchema = userResponseSchema.pick({ id: true });
