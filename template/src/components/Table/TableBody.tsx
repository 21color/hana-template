import { ReactNode } from 'react';

export interface TableBodyProps<T> {
  className?: string;
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
}

export const TableBody = <T extends unknown>({
  data,
  renderRow,
  className,
}: TableBodyProps<T>) => {
  return <tbody className={className}>{data.map(renderRow)}</tbody>;
};
