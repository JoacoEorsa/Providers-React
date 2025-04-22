import { useMemo } from "react";

import { createColumnHelper, useTable, type UseTableProps } from "@/components/ui";
import { useTranslation } from "@/i18n";
import type { PaymentResponse } from "@/services/payments/types";
import { PaymentRowActions } from "../-components/payment-row-actions";

export const usePaymentsTable = ({
  data = [],
  ...props
}: Omit<UseTableProps<PaymentResponse>, "columns">) => {
  const { t } = useTranslation();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<PaymentResponse>();

    return [
      columnHelper.accessor("status", {
        meta: { stringifiedHeader: t("payments.table.columns.status") },
        header: t("payments.table.columns.status"),
        cell: ({ row }) => {
          return <div className="capitalize">{row.getValue("status")}</div>;
        },
      }),
      columnHelper.accessor("email", {
        meta: { stringifiedHeader: t("payments.table.columns.email") },
        header: t("payments.table.columns.email"),
        cell: ({ row }) => {
          return <div className="lowercase">{row.getValue("email")}</div>;
        },
      }),
      columnHelper.accessor("amount", {
        meta: { stringifiedHeader: t("payments.table.columns.amount") },
        header: t("payments.table.columns.amount"),
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));

          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount);

          return <div className="font-medium">{formatted}</div>;
        },
      }),
      columnHelper.display({
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          return <PaymentRowActions row={row} />;
        },
      }),
    ];
  }, [t]);

  return useTable({ columns, data, ...props });
};
