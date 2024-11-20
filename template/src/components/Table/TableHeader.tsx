import { TableCell } from './TableCell';
import { TableRow } from './TableRow';

export interface TableHeaderProps {
  className?: string;
  columns: string[];
}

export const TableHeader = ({ columns, className }: TableHeaderProps) => {
  return (
    <thead className={className}>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column} header>
            {column}
          </TableCell>
        ))}
      </TableRow>
    </thead>
  );
};
