import { IAppointment } from "src/@types";
import {
  allSlots,
  sortAppointmentByTime,
} from "src/Components/shared/data-transform";
import {
  setDataAppointMentDetailsModal,
  toggleAppointMentDetailsModal,
} from "src/store";
import { useAppDispatch } from "src/store/hooks";

import "./AppointmentList.css";

export const AppointmentList = ({
  appointments,
}: {
  appointments: IAppointment[];
}) => {
  const dispatch = useAppDispatch();
  const handleViewAppointmentDetails = (item: IAppointment) => {
    dispatch(setDataAppointMentDetailsModal(item));
    dispatch(toggleAppointMentDetailsModal(true));
  };

  if (appointments.length === 0) {
    return <></>;
  }

  return (
    <>
      <ul className="appointmentlist">
        {sortAppointmentByTime([...appointments]).map((item) => (
          <li
            key={item._id}
            onClick={(e) => {
              e.stopPropagation();
              handleViewAppointmentDetails(item);
            }}
          >
            <span
              style={{
                fontSize: 14,
              }}
            >
              {allSlots[Number(item.selectedSlot)]}
              {` ${item.firstName} ${item.lastName}, `}
              {`${item.person} `}
              persons
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
