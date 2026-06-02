import { deepSnakeKeys } from "string-ts";
import { z } from "zod";

import { publicApi } from "@/config/api";
import { parsePaginatedResponse } from "@/services/schemas";
import type { RequestParams } from "@/services/types";
import { getProviderSchema } from "./schemas";
import type { Provider, ProvidersFilter } from "./types";

export const getProviders = async (params: RequestParams<ProvidersFilter>) => {
  const response = await publicApi.get("providers", { params: deepSnakeKeys(params) });

  return parsePaginatedResponse(z.array(getProviderSchema()), response.data);
};

export const getProvider = async (id: Provider["id"]) => {
  const response = await publicApi.get(`providers/${id}`);

  return getProviderSchema().parse(response.data.data);
};
