import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import tripReducer from "../redux/features/trips/tripSlice";
import tripFilterReducer from "../redux/features/trips/filterSlice";
import tripImagesReducer from "./features/trips/tripImagesSlice";
import transReducer from "./features/transes/transSlice";
import transFilterReducer from "../redux/features/transes/transfilterSlice";
import activityReducer from "./features/activity/ActivitySlice";
import activityFilterReducer from "./features/activity/ActivityFilterSlice";
import userFilterReducer from "./features/auth/UserFilterSlice";
import resevationReducer from "./features/reservation/ReservationSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userFilter: userFilterReducer,
    trip: tripReducer,
    tripFilter: tripFilterReducer,
    tripImages: tripImagesReducer,
    trans: transReducer,
    transFilter: transFilterReducer,
    activity: activityReducer,
    activityFilter: activityFilterReducer,
    reservation: resevationReducer,
  },
});
