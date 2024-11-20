import { createContext, ReactNode, useContext } from 'react';
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

const TableContext = createContext<TableProps<unknown> | undefined>(undefined);

export const TableProvider = <T,>({
  children,
  value,
}: {
  children: ReactNode;
  value: TableProps<T>;
}) => {
  return (
    <TableContext.Provider value={value as TableProps<unknown>}>
      {children}
    </TableContext.Provider>
  );
};

export const Table = <T extends unknown>({
  columns,
  data,
  renderRow,
  className,
}: TableProps<T>) => {
  const tableClassName = className ? `${className}-table` : 'table';

  return (
    <TableProvider value={{ columns, data, renderRow }}>
      <table className={tableClassName}>
        <TableHeader />
        <TableBody />
      </table>
    </TableProvider>
  );
};

export const useTableValue = () => {
  const value = useContext(TableContext);

  if (!value) {
    throw new Error('useTableValue must be used within a Table component');
  }

  return value;
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
