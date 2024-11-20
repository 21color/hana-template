import { ReactNode } from 'react';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

export interface TableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
  className?: string;
}

export const Table = <T extends unknown>({
  columns,
  data,
  renderRow,
  className,
}: TableProps<T>) => {
  const tableClassName = className ? `${className}-table` : 'table';

  return (
    <table className={tableClassName}>
      <TableHeader columns={columns} />
      <TableBody data={data} renderRow={renderRow} />
    </table>
  );
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
