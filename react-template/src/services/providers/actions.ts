import { useQuery } from "@tanstack/react-query";

import type { RequestParams, UseQueryProps } from "@/services/types";
import { queries } from "./factories";
import type { Provider, ProvidersFilter } from "./types";

export const useProvider = (id: Provider["id"], props?: UseQueryProps<typeof queries.detail>) => {
  return useQuery({ ...queries.detail(id), ...props });
};

export const useProviders = (
  params: RequestParams<ProvidersFilter>,
  props?: UseQueryProps<typeof queries.list>,
) => {
  return useQuery({ ...queries.list(params), ...props });
};
