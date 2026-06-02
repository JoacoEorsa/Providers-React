import { z } from "zod";

export const specialtySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});

export const clinicSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  address: z.string().min(1).nullable(),
  city: z.string().min(1).nullable(),
  state: z.string().length(2).nullable(),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/)
    .nullable(),
  phone: z.string().min(1).nullable(),
});

export const providerSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().min(1),
  gender: z.enum(["male", "female", "other"]),
  about: z.string().nullable(),
  languages: z.array(z.string()).nullable(),
  profilePic: z.url().nullable(),
  specialty: specialtySchema.nullable(),
  clinics: z.array(clinicSchema),
});
