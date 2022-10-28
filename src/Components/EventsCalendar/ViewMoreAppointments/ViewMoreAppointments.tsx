import { Spin } from "antd";
import dayjs from "dayjs";
import React from "react";
import { IAppointment } from "src/@types";
import { AppModal } from "src/Components/shared/UI/AppModal/AppModal";
import { toggleViewMoreAppointmentModal } from "src/store/calendar/calendar.reducer";
import { useAppSelector } from "src/store/hooks";
import { AppointmentList } from "../AppointmentList/AppointmentList";

export const ViewMoreAppointments = () => {
  const { open, appointments } = useAppSelector((state) => ({
    open: state.calendar.calendarModal.VIEW_MORE_APPOINTMENTS.open,
    appointments: state.calendar.calendarModal.VIEW_MORE_APPOINTMENTS.data as
      | IAppointment[]
      | undefined,
  }));
  if (!appointments) {
    return <Spin />;
  }
  const today = dayjs(appointments[0].selectedDate).format("dddd, MMM, DD");

  return (
    <AppModal
      toggleModal={toggleViewMoreAppointmentModal}
      title={`${today}`}
      open={open}
      width={360}
    >
      <AppointmentList listAppointments={appointments} />
    </AppModal>
  );
};
