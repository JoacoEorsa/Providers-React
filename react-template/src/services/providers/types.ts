import type { z } from "zod";

import type {
  clinicSchema,
  providerSchema,
  providersFilterSchema,
  specialtySchema,
} from "./schemas";

export type Specialty = z.infer<typeof specialtySchema>;

export type Clinic = z.infer<typeof clinicSchema>;

export type Provider = z.infer<typeof providerSchema>;

export type ProvidersFilter = z.infer<typeof providersFilterSchema>;

export type Gender = Provider["gender"];
