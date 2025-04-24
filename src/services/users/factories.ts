import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getUsersList } from "./api";

export const queries = createQueryKeys("users", {
  list: (params) => {
    return {
      queryKey: [params],
      queryFn: () => {
        return getUsersList(params);
      },
    };
  },
});
