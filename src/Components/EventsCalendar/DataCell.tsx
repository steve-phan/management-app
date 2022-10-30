import { Badge, Card } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { NotificationOutlined } from "@ant-design/icons";

import { IAppointment } from "src/@types";

import { appointmentMapping, getDate } from "../shared/custom-dayjs";
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
  const dayObj = appointmentMapping(appointments);
  const date = getDate(value.format());
  const listAppointments = dayObj[date] as IAppointment[];

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
