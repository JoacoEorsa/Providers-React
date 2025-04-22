import { z } from "zod";

import { paymentStatus } from "@/services/payments/constants";

export const paymentResponseSchema = z.object({
  id: z.string(),
  amount: z.number(),
  status: z.nativeEnum(paymentStatus),
  email: z.string(),
});

export const createPaymentRequestSchema = paymentResponseSchema.omit({ id: true });
export const deletePaymentRequestSchema = paymentResponseSchema.pick({ id: true });
