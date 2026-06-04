import { deepSnakeKeys } from "string-ts";

import { publicApi } from "@/config/api";
import type { LoginPayload, SignupPayload } from "./types";

export const login = ({ email, password }: LoginPayload) => {
  return Promise.resolve({
    data: { authToken: `super-encrypted-auth-token-for-${email}-${password}` },
  });
  // return publicApi.post<ServiceResponse<LoginResponse>>('auth/login', { email, password });
};

export const signup = (data: SignupPayload) => {
  return publicApi.post("auth/signup", deepSnakeKeys(data));
};
