import { useQuery } from "@tanstack/react-query";

import type { RequestParams, UseQueryProps } from "@/services/types";
import { queries } from "./factories";
import type { UserFilterKey } from "./types";

export const useUsersListQuery = (
  params: RequestParams<Record<UserFilterKey, string | undefined>>,
  props?: UseQueryProps<typeof queries.list>,
) => {
  return useQuery({ ...queries.list(params), ...props });
};
