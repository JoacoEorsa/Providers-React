import { useMemo } from "react";

import { createColumnHelper, useTable, type UseTableProps } from "@/components/ui";
import { useTranslation } from "@/i18n";
import type { UserResponse } from "@/services";
import { UserRowActions } from "../-components/user-row-actions";

export const useUsersTable = ({
  data = [],
  ...props
}: Omit<UseTableProps<UserResponse>, "columns">) => {
  const { t } = useTranslation();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<UserResponse>();

    return [
      columnHelper.accessor("id", {
        meta: { stringifiedHeader: t("users.table.columns.id") },
        header: t("users.table.columns.id"),
      }),
      columnHelper.accessor("email_address", {
        meta: { stringifiedHeader: t("users.table.columns.email") },
        header: t("users.table.columns.email"),
      }),
      columnHelper.accessor("name", {
        meta: { stringifiedHeader: t("users.table.columns.name") },
        header: t("users.table.columns.name"),
      }),
      columnHelper.display({
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          return <UserRowActions row={row} />;
        },
      }),
    ];
  }, [t]);

  return useTable({ columns, data, ...props });
};
