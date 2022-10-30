import { Dayjs } from "dayjs";
import { useMemo } from "react";

import { IAppointment } from "src/@types";

import { appointmentMapping } from "../shared/data-transform";
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
  const listAppointments = useMemo(
    () => appointmentMapping(appointments, value),
    []
  );

  if (!listAppointments) {
    return <></>;
  }

  return (
    <AppointmentList
      listAppointments={listAppointments}
      isCollapse
      rangeQuery={rangeQuery}
      value={value}
    />
  );
};
