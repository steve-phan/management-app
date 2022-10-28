import { createSlice } from "@reduxjs/toolkit";
import { STATES } from "mongoose";

import { ROLE } from "src/@types/Employee.types";
import { IEmployeeInfo } from "src/apis/API";

const activeEmployeeDefault: Omit<IActiveEmployee, "password"> = {
  isEmployeeLogin: false,
  userName: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  role: ROLE.EMPLOYEE,
  _id: "",
  shopId: "",
};

export interface IActiveEmployee extends IEmployeeInfo {
  isEmployeeLogin: boolean;
}

const employeeSlice = createSlice({
  name: "calendar",
  initialState: {
    calendarModal: {
      open: false,
      data: undefined,
    },
    allEmployees: [] as IEmployeeInfo[],
    activeEmployee: activeEmployeeDefault,
  },
  reducers: {
    toggleCalendarModal(state, action) {
      state.calendarModal.open = action.payload;
    },

    setDataCalendarModal(state, action) {
      state.calendarModal.data = action.payload;
    },
    setAllEmployees(state, action) {
      state.allEmployees = action.payload;
    },
  },
});

export const { toggleCalendarModal, setDataCalendarModal } =
  employeeSlice.actions;

export default employeeSlice.reducer;
