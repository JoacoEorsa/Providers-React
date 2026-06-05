import { z } from "zod";

import i18n from "@/i18n";
import { hasLetter, hasMinLength, hasNumber } from "@/services/users/schemas";

export const getSignupPayloadSchema = () => {
  return z
    .object({
      name: z.string().min(1, {
        message: i18n.t("form.errors.required", { field: i18n.t("form.name") }),
      }),
      email: z.email({
        message: i18n.t("form.errors.invalidField", { field: i18n.t("form.email") }),
      }),
      password: z
        .string()
        .refine(hasMinLength, { message: i18n.t("form.errors.passwordTooWeak") })
        .refine(hasNumber, { message: i18n.t("form.errors.passwordTooWeak") })
        .refine(hasLetter, { message: i18n.t("form.errors.passwordTooWeak") }),
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

export const getLoginPayloadSchema = () => {
  return z.object({
    email: z.email({
      message: i18n.t("form.errors.invalidField", { field: i18n.t("form.email") }),
    }),
    password: z.string().min(6, {
      message: i18n.t("form.errors.minLength", { field: i18n.t("form.password"), length: 6 }),
    }),
  });
};

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number(),
});
