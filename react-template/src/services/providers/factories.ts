import { createQueryKeys } from "@lukemorales/query-key-factory";

import type { RequestParams } from "@/services/types";
import { getProvider, getProviders } from "./api";
import type { Provider, ProvidersFilter } from "./types";

export const queries = createQueryKeys("providers", {
  detail: (id: Provider["id"]) => {
    return {
      queryKey: [id],
      queryFn: () => {
        return getProvider(id);
      },
    };
  },
  list: (params: RequestParams<ProvidersFilter>) => {
    return {
      queryKey: [params],
      queryFn: () => {
        return getProviders(params);
      },
    };
  },
});
