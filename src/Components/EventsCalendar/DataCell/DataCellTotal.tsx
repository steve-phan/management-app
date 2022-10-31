import React from "react";
import { IAppointment } from "src/@types";
import {
  setDataViewMoreAppointMentsModal,
  toggleViewMoreAppointmentModal,
} from "src/store";
import { useAppDispatch } from "src/store/hooks";

import { FireFilled } from "@ant-design/icons";

import "./DataCellTotal.css";

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

  if (appointments?.length === 0) {
    return <></>;
  }

  return (
    <ul className="events">
      <li
        style={{
          background: appointments?.length > 10 ? "#fb5d2e" : "#039be5",
          fontSize: 12,
        }}
        onClick={(e) => handleViewMoreAppointments(e, appointments)}
      >
        <span>{`${appointments.length} appointments`}</span>
        {appointments?.length > 10 && (
          <span className="events-hot">
            <FireFilled />
          </span>
        )}
      </li>
    </ul>
  );
};
