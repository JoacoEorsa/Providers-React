import { publicApi } from "@/config/api";
import type { ServiceResponse } from "@/services/types";
import type { DeleteUserRequest, UserRequestParams, UserResponse } from "./types";

export const getUsersList = async ({ filter, page }: UserRequestParams) => {
  const response = await publicApi.get<ServiceResponse<UserResponse[]>>("users", {
    params: { page, filter },
  });

  return response?.data;
};

export const deleteUser = async ({ id }: DeleteUserRequest) => {
  return publicApi.delete<ServiceResponse<UserResponse>>(`users/${id}`);
};
