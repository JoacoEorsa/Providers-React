import { publicApi } from "@/config/api";
import type { ServiceResponse } from "@/services/types";
import type {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  UpdateUserRequest,
  User,
  UserRequestParams,
} from "./types";

export const getUsersList = async ({ filter, page }: UserRequestParams) => {
  const response = await publicApi.get<ServiceResponse<User[]>>("users", {
    params: { page, filter },
  });

  return response?.data;
};

export const deleteUser = async ({ id }: DeleteUserRequest) => {
  return publicApi.delete<ServiceResponse<User>>(`users/${id}`);
};

export const createUser = async (data: CreateUserRequest) => {
  return publicApi.post<ServiceResponse<CreateUserResponse>>("users", data);
};

export const updateUser = async (data: UpdateUserRequest) => {
  return publicApi.put<ServiceResponse<User>>(`users/${data.id}`, data);
};
