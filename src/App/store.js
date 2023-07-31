import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import tripReducer from "../redux/tripSlice";
import bookingReducer from "../redux/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripReducer,
    bookings: bookingReducer,
  },
});
