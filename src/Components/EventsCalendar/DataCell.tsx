import { Badge } from "antd";
import { Dayjs } from "dayjs";

import { IAppointment } from "src/@types";

import { appointmentMapping } from "../shared/custom-dayjs";

export const DataCell = ({
  value,
  appointments,
}: {
  value: Dayjs;
  appointments: IAppointment[];
}) => {
  const dayObj = appointmentMapping(appointments);
  const date = value.date();
  const listAppointments = dayObj[date] as IAppointment[];
  if (!listAppointments) {
    return <></>;
  }

  if (listAppointments?.length > 3) {
    return (
      <>
        <ul className="events">
          {listAppointments.slice(0, 2).map((item) => (
            <li key={item._id}>{item.firstName + item.lastName}</li>
          ))}
          <li className="viewmore" key={listAppointments[3]._id}>
            <Badge
              status="warning"
              text={` View more ${listAppointments.length - 2}`}
            />
          </li>
        </ul>
      </>
    );
  }

  return (
    <ul className="events">
      {listAppointments.map((item) => (
        <li key={item._id}>{item.firstName + item.lastName}</li>
      ))}
    </ul>
  );
};
