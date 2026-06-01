import { z } from "zod";

export const getSpecialtySchema = () => {
  return z.object({
    id: z.number(),
    name: z.string(),
  });
};

export const getClinicSchema = () => {
  return z.object({
    id: z.number(),
    name: z.string(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    phone: z.string().nullable(),
  });
};

export const getProviderSchema = () => {
  return z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    gender: z.enum(["male", "female", "other"]),
    about: z.string().nullable(),
    languages: z.array(z.string()).nullable(),
    profilePic: z.string().nullable(),
    specialty: getSpecialtySchema().nullable(),
    clinics: z.array(getClinicSchema()),
  });
};
