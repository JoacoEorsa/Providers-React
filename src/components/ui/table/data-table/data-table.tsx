import { useTranslation } from '@/i18n';
import { flexRender, Table, type TableProps } from '../table';
import { Pagination } from './pagination';
import { ViewOptions } from './view-options';

interface DataTableProps<T> {
  isLoadingData?: boolean;
  table: TableProps<T>;
  withColumnVisibility?: boolean;
  withPagination?: boolean;
}

export const DataTable = <T,>({
  isLoadingData,
  table,
  withColumnVisibility = false,
  withPagination = true,
}: DataTableProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-y-2">
      {withColumnVisibility ? <ViewOptions table={table} /> : null}

      <Table.Root>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Head key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </Table.Head>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Header>

        <Table.Body>
          {isLoadingData ? (
            <Table.Skeleton
              columnsLength={table.getAllColumns().length}
              pageSize={table.getState().pagination.pageSize}
            />
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Table.Cell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            })
          ) : (
            <Table.Row>
              <Table.Cell className="h-24 text-center" colSpan={table.getAllColumns().length}>
                {t('table.noResults')}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      {withPagination ? <Pagination table={table} /> : null}
    </div>
  );
};
