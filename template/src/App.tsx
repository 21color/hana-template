import { useDispatch, useSelector } from 'react-redux';
import { match } from 'ts-pattern';
import './App.css';
import reactLogo from './assets/react.svg';
import { TableData } from './components/RenderTable';
import { Table } from './components/Table/Table';
import { fetchAirlines, increment } from './store/counterSlice';
import { AppDispatch, RootState } from './store/store';
import viteLogo from '/vite.svg';

function App() {
  const { count, data, status } = useSelector(
    (state: RootState) => state.counter,
  );

  const dispatch = useDispatch<AppDispatch>();

  const renderRow = (item: TableData<string>, index: number) => {
    return (
      <Table.Row key={index}>
        {Object.values(item).map((value, index) => (
          <Table.Cell key={index}>{String(value)}</Table.Cell>
        ))}
      </Table.Row>
    );
  };

  return (
    <>
      <div>
        {match(status)
          .with('loading', () => <div>Loading...</div>)
          .with('error', () => <div>Error fetching data</div>)
          .with('success', () => (
            <Table
              columns={Object.keys(data[0])}
              data={data}
              renderRow={renderRow}
            />
          ))
          .otherwise(() => null)}

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>count is {count}</button>
        <button onClick={() => dispatch(fetchAirlines())}>
          Fetch Airlines
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
