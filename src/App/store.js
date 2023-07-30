import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import tripReducer from "../redux/tripSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripReducer,
  },
});