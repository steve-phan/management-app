import React from "react";

import { AppModal } from "src/Components/shared/UI/AppModal/AppModal";
import { toggleAddNewAppointmentModal } from "src/store";
import { useAppSelector } from "src/store/hooks";

import { NewAppointment } from "./NewAppointment/NewAppointment";

export const AddNewAppointment = () => {
  const { open } = useAppSelector((state) => ({
    open: state.calendar.calendarModal.ADD_NEW_APPOINTMENT.open,
  }));
  return (
    <AppModal
      title="Add new Appointment"
      open={open}
      toggleModal={toggleAddNewAppointmentModal}
    >
      <NewAppointment />
    </AppModal>
  );
};
