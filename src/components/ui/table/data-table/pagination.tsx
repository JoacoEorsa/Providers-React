import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n';
import type { TableProps } from '../table';

interface PaginationProps<T> {
  table: TableProps<T>;
}

export const Pagination = <T,>({ table }: PaginationProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="text-muted-foreground text-sm">
        {t('table.pagination.pageCount', {
          currentPage: table.getState().pagination.pageIndex + 1,
          totalPages: table.getPageCount().toLocaleString(),
        })}
      </div>

      <div className="space-x-2">
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            return table.previousPage();
          }}
          size="sm"
          variant="outline"
        >
          {t('table.pagination.buttons.previous')}
        </Button>

        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => {
            return table.nextPage();
          }}
          size="sm"
          variant="outline"
        >
          {t('table.pagination.buttons.next')}
        </Button>
      </div>
    </div>
  );
};
