import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

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
        editable: false,
      },
      VIEW_MORE_APPOINTMENTS: {
        open: false,
        data: undefined,
      },
      ADD_NEW_APPOINTMENT: {
        open: false,
        data: undefined,
        date: undefined,
      },
    },
    appointmentsList: [],
    appointmentRangeQuery: dayjs().format(),
    allEmployees: [] as IEmployeeInfo[],
    activeEmployee: activeEmployeeDefault,
  },
  reducers: {
    toggleAppointMentDetailsModal(state, action) {
      state.calendarModal.APPOINTMENT_DETAILS.open = action.payload;
    },
    toggleEditAppointMentDetailsModal(state, action) {
      state.calendarModal.APPOINTMENT_DETAILS.editable = action.payload;
    },
    toggleViewMoreAppointmentModal(state, action) {
      state.calendarModal.VIEW_MORE_APPOINTMENTS.open = action.payload;
    },
    toggleAddNewAppointmentModal(state, action) {
      state.calendarModal.ADD_NEW_APPOINTMENT.open = action.payload.open;
      state.calendarModal.ADD_NEW_APPOINTMENT.date = action.payload.date;
    },

    setDataAppointMentDetailsModal(state, action) {
      state.calendarModal.APPOINTMENT_DETAILS.data = action.payload;
    },
    setDataViewMoreAppointMentsModal(state, action) {
      state.calendarModal.VIEW_MORE_APPOINTMENTS.data = action.payload;
    },
    setDataAddNewAppointMentModal(state, action) {
      state.calendarModal.ADD_NEW_APPOINTMENT.data = action.payload;
    },
    setAppointmentsList(state, action) {
      state.appointmentsList = action.payload;
    },
    setAppointmentRangeQuery(state, action) {
      state.appointmentRangeQuery = action.payload;
    },
    setAllEmployees(state, action) {
      state.allEmployees = action.payload;
    },
  },
});

export const {
  toggleAppointMentDetailsModal,
  toggleEditAppointMentDetailsModal,
  toggleViewMoreAppointmentModal,
  toggleAddNewAppointmentModal,
  setDataAppointMentDetailsModal,
  setDataViewMoreAppointMentsModal,
  setDataAddNewAppointMentModal,
  setAppointmentsList,
  setAppointmentRangeQuery,
} = employeeSlice.actions;

export default employeeSlice.reducer;
