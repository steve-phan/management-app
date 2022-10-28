import { Dayjs } from "dayjs";

import { IAppointment } from "src/@types";
import {
  toggleAppointMentDetailsModal,
  toggleViewMoreAppointmentModal,
  setDataAppointMentDetailsModal,
  setDataViewMoreAppointMentsModal,
} from "src/store/calendar/calendar.reducer";
import { useAppDispatch } from "src/store/hooks";

import { appointmentMapping, getDate } from "../shared/custom-dayjs";

export const DataCell = ({
  value,
  appointments,
}: {
  value: Dayjs;
  appointments: IAppointment[];
}) => {
  const dispatch = useAppDispatch();

  const dayObj = appointmentMapping(appointments);
  const date = getDate(value.format());
  const listAppointments = dayObj[date] as IAppointment[];

  if (!listAppointments) {
    return <></>;
  }

  const handleViewAppointmentDetails = (item: IAppointment) => {
    dispatch(setDataAppointMentDetailsModal(item));
    dispatch(toggleAppointMentDetailsModal(true));
  };

  const handleViewMoreAppointments = () => {
    dispatch(setDataViewMoreAppointMentsModal(listAppointments));
    dispatch(toggleViewMoreAppointmentModal(true));
  };

  return (
    <>
      <ul className="events">
        {listAppointments?.length > 3 ? (
          <>
            {listAppointments.slice(0, 2).map((item) => (
              <li
                key={item._id}
                onClick={() => {
                  handleViewAppointmentDetails(item);
                }}
              >
                {`${item.firstName} ${item.lastName}`}
              </li>
            ))}
            <li
              className="viewmore"
              key={listAppointments[3]._id}
              onClick={handleViewMoreAppointments}
            >
              {listAppointments.length - 2} more
            </li>
          </>
        ) : (
          <>
            {listAppointments.map((item) => (
              <li
                key={item._id}
                onClick={() => {
                  handleViewAppointmentDetails(item);
                }}
              >
                {`${item.firstName} ${item.lastName}`}
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};
