import { createSlice } from "@reduxjs/toolkit";

import { IComment, IEmployeeInfo } from "src/apis/API";

export const DashboardPage = {
  EMPLOYEE_PAGE: "EMPLOYEE_PAGE",
  EMPLOYEE_DETAILS: "EMPLOYEE_DETAILS",
  EVENTS_CALENDAR: "EVENTS_CALENDAR",
} as const;
export type TDashboardPage = keyof typeof DashboardPage;

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    openModal: {
      ADD_EMPPLOYEE: false,
      UPLOAD_CSV_FILE_EMPLOYEE: false,
      DELETE_EMPLOYEE: false,
      EDIT_EMPLOYEE: false,
    },
    currentInActionEmployee: undefined as unknown as IEmployeeInfo,
    employeeDetails: {
      open: false,
      employeeInfo: undefined as unknown as IEmployeeInfo,
      employeeComments: [] as IComment[],
    },
    dashboardPage: DashboardPage.EVENTS_CALENDAR as TDashboardPage,
  },
  reducers: {
    toggleAddEmployeeModal(state, action) {
      state.openModal.ADD_EMPPLOYEE = action.payload;
    },
    toggleUploadCSVFILEEMPLOYEEModal(state, action) {
      state.openModal.UPLOAD_CSV_FILE_EMPLOYEE = action.payload;
    },
    toggleDeleteEmployeeModal(state, action) {
      state.openModal.DELETE_EMPLOYEE = action.payload;
    },
    toggleEditEmployeeModal(state, action) {
      state.openModal.EDIT_EMPLOYEE = action.payload;
    },
    setCurrentInActionEmployee(state, action) {
      state.currentInActionEmployee = action.payload;
    },
    toggleEmployeeDetails(state, action) {
      state.employeeDetails.open = action.payload;
    },
    setDashBoardPage(state, action) {
      state.dashboardPage = action.payload;
    },
    setEmployeeInfoPage(state, action) {
      state.employeeDetails.employeeInfo = action.payload;
    },
    setEmployeeComments(state, action) {
      state.employeeDetails.employeeComments = action.payload;
    },
  },
});

export const {
  toggleAddEmployeeModal,
  toggleUploadCSVFILEEMPLOYEEModal,
  toggleDeleteEmployeeModal,
  toggleEditEmployeeModal,
  toggleEmployeeDetails,
  setCurrentInActionEmployee,
  setEmployeeInfoPage,
  setEmployeeComments,
  setDashBoardPage,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
