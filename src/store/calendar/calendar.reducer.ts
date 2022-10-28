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
      APPOINTMENT_DETAILS: {
        open: false,
        data: undefined,
      },
      VIEW_MORE_APPOINTMENTS: {
        open: false,
        data: undefined,
      },
    },
    allEmployees: [] as IEmployeeInfo[],
    activeEmployee: activeEmployeeDefault,
  },
  reducers: {
    toggleAppointMentDetailsModal(state, action) {
      state.calendarModal.APPOINTMENT_DETAILS.open = action.payload;
    },
    toggleViewMoreAppointmentModal(state, action) {
      state.calendarModal.VIEW_MORE_APPOINTMENTS.open = action.payload;
    },

    setDataAppointMentDetailsModal(state, action) {
      state.calendarModal.APPOINTMENT_DETAILS.data = action.payload;
    },
    setAllEmployees(state, action) {
      state.allEmployees = action.payload;
    },
  },
});

export const { toggleAppointMentDetailsModal, setDataAppointMentDetailsModal } =
  employeeSlice.actions;

export default employeeSlice.reducer;
