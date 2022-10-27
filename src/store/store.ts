import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import employeeReducer from "./user/user.reducer";
import dashboardReducer from "./dashboard/dashboard.reducer";
import calendarReducer from "./calendar/calendar.reducer";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    dashboard: dashboardReducer,
    calendar: calendarReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
