import { deepSnakeKeys } from "string-ts";

import { publicApi } from "@/config/api";
import { loginResponseSchema } from "./schemas";
import type { LoginPayload, SignupPayload } from "./types";

export const login = async (payload: LoginPayload) => {
  const response = await publicApi.post("auth/login", payload);

  return loginResponseSchema.parse(response.data.data);
};

export const signup = (data: SignupPayload) => {
  return publicApi.post("auth/signup", deepSnakeKeys(data));
};
