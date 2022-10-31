import { Dayjs } from "dayjs";
import React from "react";

import { IAppointment } from "src/@types";
import {
  setDataViewMoreAppointMentsModal,
  toggleViewMoreAppointmentModal,
} from "src/store";
import { useAppDispatch } from "src/store/hooks";

import { AppointmentList } from "../AppointmentList/AppointmentList";
import "./DataCell.css";

export const DataCell = ({
  // value,
  appointments,
}: // rangeQuery,
{
  value?: Dayjs;
  appointments: IAppointment[];
  rangeQuery?: string;
}) => {
  const dispatch = useAppDispatch();
  const handleViewMoreAppointments = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(setDataViewMoreAppointMentsModal(appointments));
    dispatch(toggleViewMoreAppointmentModal(true));
  };

  if (!appointments) {
    return <></>;
  }
  return (
    <div className="datacell-appointments">
      {appointments?.length > 3 ? (
        <>
          <AppointmentList appointments={appointments.slice(0, 2)} />
          <span
            className="viewmore"
            key={appointments[3]._id}
            onClick={handleViewMoreAppointments}
          >
            {appointments.length - 2} more
          </span>
        </>
      ) : (
        <AppointmentList appointments={appointments} />
      )}
    </div>
  );
};
