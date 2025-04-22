import type { z } from "zod";

import type {
  createPaymentRequestSchema,
  deletePaymentRequestSchema,
  paymentResponseSchema,
} from "./schemas";

export type PaymentResponse = z.infer<typeof paymentResponseSchema>;
export type CreatePaymentRequest = z.infer<typeof createPaymentRequestSchema>;
export type DeletePaymentRequest = z.infer<typeof deletePaymentRequestSchema>;
