import type { z } from "zod";

import type { RequestParams } from "@/services/types";
import type { USER_FILTER_KEYS } from "./constants";
import type {
  deleteUserRequestSchema,
  getCreateUserRequestSchema,
  userResponseSchema,
} from "./schemas";

export type User = z.infer<typeof userResponseSchema>;

export type UserFilterKey = (typeof USER_FILTER_KEYS)[keyof typeof USER_FILTER_KEYS];

export type UserRequestParams = RequestParams<Record<UserFilterKey, string | undefined>>;

export type DeleteUserRequest = z.infer<typeof deleteUserRequestSchema>;

export type CreateUserRequest = z.infer<ReturnType<typeof getCreateUserRequestSchema>>;

export type UpdateUserRequest = CreateUserRequest & Pick<User, "id">;

export type CreateUserResponse = {
  data: UserFilterKey;
};
