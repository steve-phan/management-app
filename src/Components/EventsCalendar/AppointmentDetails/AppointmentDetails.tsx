import { IAppointment } from "src/@types";
import { AppModal } from "src/Components/shared/UI/AppModal/AppModal";
import { toggleAppointMentDetailsModal } from "src/store/calendar/calendar.reducer";
import { useAppSelector } from "src/store/hooks";

export const AppointmentDetails = () => {
  const { open, appointment } = useAppSelector((state) => ({
    open: state.calendar.calendarModal.APPOINTMENT_DETAILS,
    appointment: state.calendar.calendarModal.data as IAppointment | undefined,
  }));
  console.log({ appointment });
  return (
    <AppModal
      toggleModal={toggleAppointMentDetailsModal}
      title="Appointment Details"
      open={open}
    >
      <>Appointment Details Modal</>
    </AppModal>
  );
};
