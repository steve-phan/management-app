import dayjs, { Dayjs } from "dayjs";
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
  const listAppointments = useMemo(
    () => appointmentMapping(appointments, value),
    [appointments]
  );
  const handleViewMoreAppointments = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(setDataViewMoreAppointMentsModal(listAppointments));
    dispatch(toggleViewMoreAppointmentModal(true));
  };

  if (!listAppointments) {
    return <></>;
  }

  if (
    value &&
    listAppointments.length > 0 &&
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
          <span>{`${listAppointments.length} appointments`}</span>
        </li>
      </ul>
    );
  }
  return (
    <div className="datacell-appointments">
      {listAppointments?.length > 3 ? (
        <>
          <AppointmentList listAppointments={listAppointments.slice(0, 2)} />
          <span
            className="viewmore"
            key={listAppointments[3]._id}
            onClick={handleViewMoreAppointments}
          >
            {listAppointments.length - 2} more
          </span>
        </>
      ) : (
        <AppointmentList listAppointments={listAppointments} />
      )}
    </div>
  );
};
