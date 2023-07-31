import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTripsAPI, getTripByIdAPI } from '../services/tripService';

export const getTrips = createAsyncThunk('trips/getTrips', getTripsAPI);
export const getTripById = createAsyncThunk('trips/getTripById', getTripByIdAPI);

const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
    selectedTrip: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
        state.error = null;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTripById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTripById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTrip = action.payload;
        state.error = null;
      })
      .addCase(getTripById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tripSlice.reducer;
