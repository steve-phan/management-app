import { Dayjs } from "dayjs";

import { IAppointment } from "src/@types";

import { appointmentMapping, getDate } from "../shared/custom-dayjs";

export const DataCell = ({
  value,
  appointments,
}: {
  value: Dayjs;
  appointments: IAppointment[];
}) => {
  const dayObj = appointmentMapping(appointments);
  const date = getDate(value.format());
  const listAppointments = dayObj[date] as IAppointment[];
  if (!listAppointments) {
    return <></>;
  }

  return (
    <>
      <ul className="events">
        {listAppointments?.length > 3 ? (
          <>
            {listAppointments.slice(0, 2).map((item) => (
              <li
                key={item._id}
                onClick={() => {
                  console.log("VIEW AN EVENT");
                }}
              >
                {`${item.firstName} ${item.lastName}`}
              </li>
            ))}
            <li
              className="viewmore"
              key={listAppointments[3]._id}
              onClick={() => {
                console.log("VIEW More EVENT");
              }}
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
                  console.log("VIEW AN EVENT");
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
