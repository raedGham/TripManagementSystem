import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import tripReducer  from "../redux/features/trips/tripSlice";
import tripFilterReducer  from "../redux/features/trips/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trip: tripReducer,
    tripFilter: tripFilterReducer,

  },
});
