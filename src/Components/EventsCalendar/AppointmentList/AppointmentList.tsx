import dayjs, { Dayjs } from "dayjs";

import { IAppointment } from "src/@types";
import { allSlots } from "src/Components/shared/custom-dayjs";
import {
  toggleAppointMentDetailsModal,
  toggleViewMoreAppointmentModal,
  setDataAppointMentDetailsModal,
  setDataViewMoreAppointMentsModal,
} from "src/store/calendar/calendar.reducer";
import { useAppDispatch } from "src/store/hooks";

export const AppointmentList = ({
  listAppointments,
  isCollapse,
}: {
  listAppointments: IAppointment[];
  isCollapse?: boolean;
}) => {
  const dispatch = useAppDispatch();

  const sortedAppointments = [...listAppointments].sort((a, b) => {
    return Number(a.selectedSlot) - Number(b.selectedSlot);
  });

  const handleViewAppointmentDetails = (item: IAppointment) => {
    dispatch(setDataAppointMentDetailsModal(item));
    dispatch(toggleAppointMentDetailsModal(true));
  };

  const handleViewMoreAppointments = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(setDataViewMoreAppointMentsModal(sortedAppointments));
    dispatch(toggleViewMoreAppointmentModal(true));
  };
  return (
    <>
      <ul className={`events ${!isCollapse && `no-collapse-event`}`}>
        {isCollapse && sortedAppointments?.length > 3 ? (
          <>
            {sortedAppointments.slice(0, 2).map((item) => (
              <li
                key={item._id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewAppointmentDetails(item);
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {allSlots[Number(item.selectedSlot)]}
                </span>
                {` ${item.firstName} ${item.lastName}`}
              </li>
            ))}
            <li
              className="viewmore"
              key={sortedAppointments[3]._id}
              onClick={handleViewMoreAppointments}
            >
              {sortedAppointments.length - 2} more
            </li>
          </>
        ) : (
          <>
            {sortedAppointments.map((item) => (
              <li
                key={item._id}
                onClick={() => {
                  handleViewAppointmentDetails(item);
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {allSlots[Number(item.selectedSlot)]}
                </span>
                {` ${item.firstName} ${item.lastName}`}
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};
