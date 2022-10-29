import store from "./store";
export type { AppDispatch, AppThunk, RootState } from "./store";
export {
  toggleAddEmployeeModal,
  toggleUploadCSVFILEEMPLOYEEModal,
  toggleDeleteEmployeeModal,
  toggleEditEmployeeModal,
  toggleEmployeeDetails,
  setCurrentInActionEmployee,
  setEmployeeInfoPage,
  setEmployeeComments,
} from "./dashboard/dashboard.reducer";
export {
  setAllEmployees,
  setActiveEmployee,
  setSingOutActiveEmployee,
} from "./user/user.reducer";

export {
  toggleAppointMentDetailsModal,
  toggleViewMoreAppointmentModal,
  toggleAddNewAppointmentModal,
  setDataAppointMentDetailsModal,
  setDataViewMoreAppointMentsModal,
  setDataAddNewAppointMentModal,
  setAppointmentsList,
} from "./calendar/calendar.reducer";

export default store;
