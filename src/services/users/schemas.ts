import { z } from "zod";

import i18n from "@/i18n";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  emailAddress: z.string().email(),
});

export const hasMinLength = (value: string) => {
  return value.length >= 8;
};

export const hasNumber = (value: string) => {
  return /\d/.test(value);
};

export const hasLetter = (value: string) => {
  return /[a-zA-Z]/.test(value);
};

export const getUserSchema = () => {
  return userSchema
    .omit({ id: true })
    .extend({
      emailAddress: z
        .string()
        .min(1, { message: i18n.t("form.errors.required", { field: i18n.t("form.email") }) })
        .email({ message: i18n.t("form.errors.invalidField", { field: i18n.t("form.email") }) }),
      password: z
        .string()
        .refine(hasMinLength, {
          message: i18n.t("form.errors.minLength", { field: i18n.t("form.password"), length: 8 }),
        })
        .refine(hasNumber, {
          message: i18n.t("form.errors.containsNumber", { field: i18n.t("form.password") }),
        })
        .refine(hasLetter, {
          message: i18n.t("form.errors.containsLetter", { field: i18n.t("form.password") }),
        }),
      passwordConfirmation: z.string(),
    })
    .refine(
      (values) => {
        return values.password === values.passwordConfirmation;
      },
      {
        message: i18n.t("form.errors.passwordMismatch"),
        path: ["passwordConfirmation"],
      },
    );
};
