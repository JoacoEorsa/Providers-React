import { useState } from "react";
import type { Row } from "@tanstack/react-table";

import { Button, Dialog, DropdownMenu, Icons, toast } from "@/components/ui";
import { useTranslation } from "@/i18n";
import { type UserResponse, useUsersDeleteMutation } from "@/services";

type UserRowActionsProps = {
  row: Row<UserResponse>;
};

export const UserRowActions = ({ row }: UserRowActionsProps) => {
  const { t } = useTranslation();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { isPending, mutate: usersDelete } = useUsersDeleteMutation();

  const handleDelete = async (userId: UserResponse["id"]) => {
    usersDelete(
      { id: userId },
      {
        onSuccess: () => {
          toast.success(
            t("users.table.columns.actions.deletionSuccess", {
              name: row.getValue("name"),
            }),
          );
        },
        onError: () => {
          toast.error(
            t("users.table.columns.actions.deletionError", {
              name: row.getValue("name"),
            }),
          );
        },
        onSettled: () => {
          setShowConfirmDelete(false);
        },
      },
    );
  };

  return (
    <Dialog.Root onOpenChange={setShowConfirmDelete} open={showConfirmDelete}>
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

          <Dialog.Trigger asChild>
            <DropdownMenu.Item>{t("buttons.delete")}</DropdownMenu.Item>
          </Dialog.Trigger>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Dialog.Content isDismissible={!isPending}>
        <Dialog.Header>
          <Dialog.Title>{t("users.table.columns.actions.areYouAbsolutelySure")}</Dialog.Title>

          <Dialog.Description>
            {t("users.table.columns.actions.thisActionCantBeUndone", {
              name: row.getValue("name"),
            })}
          </Dialog.Description>
        </Dialog.Header>

        <Dialog.Footer>
          <Dialog.Close disabled={isPending} asChild>
            <Button variant="outline">{t("buttons.cancel")}</Button>
          </Dialog.Close>

          <Button
            isLoading={isPending}
            onClick={() => {
              return handleDelete(row.getValue("id"));
            }}
            type="submit"
            variant="destructive"
          >
            {t("buttons.confirm")}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
