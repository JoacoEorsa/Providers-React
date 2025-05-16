import { z } from "zod";

import i18n from "@/i18n";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  emailAddress: z.string().email(),
});

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
        .min(8, {
          message: i18n.t("form.errors.minLength", { field: i18n.t("form.password"), length: 8 }),
        })
        .regex(/\d/, {
          message: i18n.t("form.errors.containsNumber", { field: i18n.t("form.password") }),
        })
        .regex(/[a-zA-Z]/, {
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
