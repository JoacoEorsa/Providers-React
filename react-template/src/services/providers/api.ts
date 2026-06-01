import { z } from "zod";

import { publicApi } from "@/config/api";
import { parsePaginatedResponse } from "@/services/schemas";
import type { RequestParams } from "@/services/types";
import { getProviderSchema } from "./schemas";
import type { Provider, ProvidersFilter } from "./types";

const camelToSnake = (key: string) => {
  return key.replaceAll(/[A-Z]/g, (letter) => {
    return `_${letter.toLowerCase()}`;
  });
};

const serializeProvidersParams = (params: RequestParams<ProvidersFilter>) => {
  const search = new URLSearchParams();

  if (params.page != null) {
    search.set("page", String(params.page));
  }

  if (params.filter) {
    for (const [key, value] of Object.entries(params.filter)) {
      if (value === undefined || value === null || value === "") {
        continue;
      }
      search.set(`filter[${camelToSnake(key)}]`, String(value));
    }
  }

  return search.toString();
};

export const getProviders = async (params: RequestParams<ProvidersFilter>) => {
  const response = await publicApi.get("providers", {
    params,
    paramsSerializer: () => {
      return serializeProvidersParams(params);
    },
  });

  return parsePaginatedResponse(z.array(getProviderSchema()), response.data);
};

export const getProvider = async (id: Provider["id"]) => {
  const response = await publicApi.get(`providers/${id}`);

  return getProviderSchema().parse(response.data.data);
};
