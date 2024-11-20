import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const ENDPOINT = 'https://api.instantwebtools.net/v1/airlines';

export const fetchAirlines = createAsyncThunk(
  'airlines/fetchAirlines',
  async () => {
    try {
      const response = await axios.get(ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching data', error);
      return error;
    }
  },
);
interface Airline<T> {
  [key: string]: T;
}

type state = 'loading' | 'success' | 'error';

interface CounterState {
  count: number;
  data: Airline<string>[];
  status?: state;
}

const initialState: CounterState = {
  count: 0,
  data: [],
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAirlines.fulfilled, (state, action) => {
      state.status = 'success';
      state.count = action.payload.length;
      state.data = action.payload;
    });

    builder.addCase(fetchAirlines.rejected, (state) => {
      state.status = 'error';
      state.count = 0;
      state.data = [];
    });

    builder.addCase(fetchAirlines.pending, (state) => {
      state.status = 'loading';
      state.count = 0;
      state.data = [];
    });
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
