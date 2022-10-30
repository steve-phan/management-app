import { IAppointment } from "src/@types";
import { allSlots } from "src/Components/shared/data-transform";
import {
  setDataAppointMentDetailsModal,
  toggleAppointMentDetailsModal,
} from "src/store";
import { useAppDispatch } from "src/store/hooks";

export const AppointmentList = ({
  appointmentsList,
}: {
  appointmentsList: IAppointment[];
}) => {
  const dispatch = useAppDispatch();
  const handleViewAppointmentDetails = (item: IAppointment) => {
    dispatch(setDataAppointMentDetailsModal(item));
    dispatch(toggleAppointMentDetailsModal(true));
  };

  if (appointmentsList.length === 0) {
    return <></>;
  }

  return (
    <>
      <ul className="appointmentlist">
        {appointmentsList.map((item) => (
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
