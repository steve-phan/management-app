import { Dayjs } from "dayjs";
import React from "react";
import { useMemo } from "react";

import { IAppointment } from "src/@types";
import {
  setDataViewMoreAppointMentsModal,
  toggleViewMoreAppointmentModal,
} from "src/store";
import { useAppDispatch } from "src/store/hooks";

import {
  appointmentMapping,
  dateToShowDetailsArray,
} from "../shared/data-transform";
import { AppointmentList } from "./AppointmentList/AppointmentList";

export const DataCell = ({
  value,
  appointments,
  rangeQuery,
}: {
  value: Dayjs;
  appointments: IAppointment[];
  rangeQuery: string;
}) => {
  const dispatch = useAppDispatch();
  const appointmentsList = useMemo(
    () => appointmentMapping(appointments, value),
    [appointments, value]
  );
  const handleViewMoreAppointments = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(setDataViewMoreAppointMentsModal(appointmentsList));
    dispatch(toggleViewMoreAppointmentModal(true));
  };

  if (!appointmentsList) {
    return <></>;
  }
  console.log("moreeeeee");
  if (
    value &&
    appointmentsList.length > 0 &&
    !dateToShowDetailsArray.includes(value?.format("DD/MM/YYYY"))
  ) {
    return (
      <ul className="events">
        <li
          style={{
            background: "#039be5",
            fontSize: 12,
          }}
          onClick={handleViewMoreAppointments}
        >
          <span>{`${appointmentsList.length} appointments`}</span>
        </li>
      </ul>
    );
  }
  return (
    <div className="datacell-appointments">
      {appointmentsList?.length > 3 ? (
        <>
          <AppointmentList appointmentsList={appointmentsList.slice(0, 2)} />
          <span
            className="viewmore"
            key={appointmentsList[3]._id}
            onClick={handleViewMoreAppointments}
          >
            {appointmentsList.length - 2} more
          </span>
        </>
      ) : (
        <AppointmentList appointmentsList={appointmentsList} />
      )}
    </div>
  );
};
