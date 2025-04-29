import { z } from "zod";

import i18n from "@/i18n";

export const getLoginRequestSchema = () => {
  return z.object({
    email: z
      .string()
      .min(1, { message: i18n.t("form.errors.required", { field: i18n.t("form.email") }) })
      .email({ message: i18n.t("form.errors.invalidField", { field: i18n.t("form.email") }) }),
    password: z.string().min(6, {
      message: i18n.t("form.errors.minLength", { field: i18n.t("form.password"), length: 6 }),
    }),
  });
};

export const loginResponseSchema = z.object({
  authToken: z.string(),
});
