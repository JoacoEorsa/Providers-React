import type { Row } from "@tanstack/react-table";

import { Button, Dialog, DropdownMenu, Icons } from "@/components/ui";
import { useTranslation } from "@/i18n";
import type { UserResponse } from "@/services";

type UserRowActionsProps = {
  row: Row<UserResponse>;
};

export const UserRowActions = ({ row }: UserRowActionsProps) => {
  const { t } = useTranslation();

  return (
    <Dialog.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="flex justify-end">
            <Button className="size-8" variant="ghost">
              <span className="sr-only">{t("users.table.columns.actions.ariaLabel")}</span>

              <Icons.MoreHorizontal />
            </Button>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content align="end">
          <DropdownMenu.Item
            onClick={() => {
              return navigator.clipboard.writeText(row.getValue("email_address"));
            }}
          >
            {t("users.table.columns.actions.copyUserEmail")}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Dialog.Root>
  );
};
