import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { DataTable } from "@/components/ui";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import {
  paginationValidationWithDefaults,
  searchTextValidation,
  useDebounce,
  usePagination,
  useSearchText,
} from "@/hooks";
import { useTranslation } from "@/i18n";
import { USER_FILTER_KEYS, useUsersListQuery } from "@/services";
import { useUsersTable } from "./-hooks/use-users-table";

const UsersPage = () => {
  const {
    actions: { changePage },
    page,
    pageIndex,
  } = usePagination(Route.id);

  const { searchText } = useSearchText(Route.id);

  const debouncedSearchText = useDebounce(searchText, 500);

  const { t } = useTranslation();

  const { data: usersListData, isLoading } = useUsersListQuery({
    filter: {
      [USER_FILTER_KEYS.EMAIL]: debouncedSearchText,
    },
    page,
  });

  const pageSize = usersListData?.meta?.per_page ?? DEFAULT_PAGE_SIZE;

  const table = useUsersTable({
    data: usersListData?.data ?? [],
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        changePage(updater({ pageIndex, pageSize }));
      }
    },
    pageCount: usersListData?.meta?.last_page,
  });

  return (
    <div className="flex flex-col gap-y-2">
      <h1>{t("users.title")}</h1>

      <DataTable
        inputPlaceholder={t("users.table.columns.actions.filterByEmail")}
        isLoading={isLoading}
        path={Route.id}
        table={table}
        withColumnVisibility
        withSearch
      />
    </div>
  );
};

export const Route = createFileRoute("/_private/users/")({
  component: UsersPage,
  validateSearch: z.object({
    ...searchTextValidation.shape,
    ...paginationValidationWithDefaults.shape,
  }),
});
