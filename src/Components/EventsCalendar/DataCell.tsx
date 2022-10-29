import { Dayjs } from "dayjs";

import { IAppointment } from "src/@types";

import { appointmentMapping, getDate } from "../shared/custom-dayjs";
import { AppointmentList } from "./AppointmentList/AppointmentList";

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

  return <AppointmentList listAppointments={listAppointments} isCollapse />;
};
