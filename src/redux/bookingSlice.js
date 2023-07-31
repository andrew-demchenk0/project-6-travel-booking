import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bookTripAPI, cancelBookingAPI, getBookingsAPI } from '../services/bookingService';

export const getBookings = createAsyncThunk('bookings/getBookings', async (_, { getState }) => {
  const token = localStorage.getItem('token');
  try {
    return await getBookingsAPI(token);
  } catch (error) {
    throw error;
  }
});

export const bookTrip = createAsyncThunk('bookings/bookTrip', async (bookingData, { getState }) => {
  const token = localStorage.getItem('token');
  try {
    return await bookTripAPI(bookingData, token);
  } catch (error) {
    throw error;
  }
});

export const cancelBooking = createAsyncThunk('bookings/cancelBooking', async (bookingId, { getState }) => {
  const token = localStorage.getItem('token');
  try {
    return await cancelBookingAPI(bookingId, token);
  } catch (error) {
    throw error;
  }
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(bookTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
        state.error = null;
      })
      .addCase(bookTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
        state.error = null;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookingSlice.reducer;
