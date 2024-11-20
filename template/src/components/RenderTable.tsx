import { match } from 'ts-pattern';
import { Table } from './Table/Table';

interface TableData<T> {
  [key: string]: T;
}

interface RenderTableProps<T> {
  data: TableData<T>[];
  state?: 'loading' | 'success' | 'error';
}

function RenderTable<T>({ data, state }: RenderTableProps<T>) {
  if (!data || data.length === 0) {
    return null;
  }

  return match(state)
    .with('loading', () => <div>Loading...</div>)
    .with('error', () => <div>Error fetching data</div>)
    .otherwise(() => {
      const renderRow = (item: TableData<T>, index: number) => {
        return (
          <Table.Row key={index}>
            {Object.values(item).map((value, index) => (
              <Table.Cell key={index}>{String(value)}</Table.Cell>
            ))}
          </Table.Row>
        );
      };

      return (
        <Table
          columns={Object.keys(data[0])}
          data={data}
          renderRow={renderRow}
        />
      );
    });
}

export default RenderTable;
