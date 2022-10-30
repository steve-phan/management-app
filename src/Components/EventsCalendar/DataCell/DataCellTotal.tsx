import React from "react";
import { IAppointment } from "src/@types";
import {
  setDataViewMoreAppointMentsModal,
  toggleViewMoreAppointmentModal,
} from "src/store";
import { useAppDispatch } from "src/store/hooks";

export const DataCellTotal = ({
  appointments,
}: {
  appointments: IAppointment[];
}) => {
  const dispatch = useAppDispatch();
  const handleViewMoreAppointments = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    appointments: IAppointment[]
  ) => {
    e.stopPropagation();
    dispatch(setDataViewMoreAppointMentsModal(appointments));
    dispatch(toggleViewMoreAppointmentModal(true));
  };
  return (
    <ul className="events">
      <li
        style={{
          background: "#039be5",
          fontSize: 12,
        }}
        onClick={(e) => handleViewMoreAppointments(e, appointments)}
      >
        <span>{`${appointments.length} appointments`}</span>
      </li>
    </ul>
  );
};
