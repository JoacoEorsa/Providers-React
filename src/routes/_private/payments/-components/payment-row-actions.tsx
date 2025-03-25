import { useState } from 'react';
import type { Row } from '@tanstack/react-table';

import { Button, Dialog, DropdownMenu, Icons, toast } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { usePaymentsDeleteMutation } from '@/services';
import type { PaymentResponse } from '@/services/payments/types';

interface PaymentRowActionsProps {
  row: Row<PaymentResponse>;
}

export const PaymentRowActions = ({ row }: PaymentRowActionsProps) => {
  const { t } = useTranslation();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const paymentsDeleteMutation = usePaymentsDeleteMutation();

  const handleDelete = async (paymentId: PaymentResponse['id']) => {
    paymentsDeleteMutation.mutate(
      { id: paymentId },
      {
        onSuccess: () => {
          toast.success(
            t('payments.table.columns.actions.deletionSuccess', {
              email: row.getValue('email'),
            }),
          );
        },
        onError: () => {
          toast.error(
            t('payments.table.columns.actions.deletionError', {
              email: row.getValue('email'),
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
              <span className="sr-only">{t('payments.table.columns.actions.ariaLabel')}</span>
              <Icons.MoreHorizontal />
            </Button>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>{t('payments.table.columns.actions.title')}</DropdownMenu.Label>

          <DropdownMenu.Item
            onClick={() => {
              return navigator.clipboard.writeText(row.getValue('email'));
            }}
          >
            {t('payments.table.columns.actions.copyPaymentEmail')}
          </DropdownMenu.Item>

          <Dialog.Trigger asChild>
            <DropdownMenu.Item>{t('buttons.delete')}</DropdownMenu.Item>
          </Dialog.Trigger>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Dialog.Content isDismissible={false}>
        <Dialog.Header>
          <Dialog.Title>{t('payments.table.columns.actions.areYouAbsolutelySure')}</Dialog.Title>
          <Dialog.Description>
            {t('payments.table.columns.actions.thisActionCantBeUndone', {
              email: row.getValue('email'),
            })}
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close>
            <Button variant="outline">{t('buttons.cancel')}</Button>
          </Dialog.Close>
          <Button
            isLoading={paymentsDeleteMutation.isPending}
            onClick={() => {
              return handleDelete(row.getValue('id'));
            }}
            type="submit"
            variant="destructive"
          >
            {t('buttons.confirm')}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
