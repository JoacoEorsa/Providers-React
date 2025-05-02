import { z } from "zod";

import i18n from "@/i18n";

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email_address: z.string(),
});

export const getCreateUserRequestSchema = () => {
  return z
    .object({
      name: z.string(),
      email_address: z
        .string()
        .min(1, { message: i18n.t("form.errors.required", { field: i18n.t("form.email") }) })
        .email({ message: i18n.t("form.errors.invalidField", { field: i18n.t("form.email") }) }),
      password: z
        .string()
        .min(8, {
          message: i18n.t("form.errors.minLength", { field: i18n.t("form.password"), length: 8 }),
        })
        .regex(/\d/, {
          message: i18n.t("form.errors.containsNumber", { field: i18n.t("form.password") }),
        }),
      password_confirmation: z.string(),
    })
    .refine(
      (val) => {
        return val.password === val.password_confirmation;
      },
      {
        message: i18n.t("form.errors.passwordMismatch"),
        path: ["password_confirmation"],
      },
    );
};

export const deleteUserRequestSchema = userResponseSchema.pick({ id: true });

export const updateUserRequestSchema = getCreateUserRequestSchema;
