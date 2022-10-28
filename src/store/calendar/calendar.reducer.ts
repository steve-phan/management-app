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
      APPOINTMENT_DETAILS: false,
      data: undefined,
    },
    allEmployees: [] as IEmployeeInfo[],
    activeEmployee: activeEmployeeDefault,
  },
  reducers: {
    toggleAppointMentDetailsModal(state, action) {
      state.calendarModal.APPOINTMENT_DETAILS = action.payload;
    },

    setDataAppointMentDetailsModal(state, action) {
      state.calendarModal.data = action.payload;
    },
    setAllEmployees(state, action) {
      state.allEmployees = action.payload;
    },
  },
});

export const { toggleAppointMentDetailsModal, setDataAppointMentDetailsModal } =
  employeeSlice.actions;

export default employeeSlice.reducer;
