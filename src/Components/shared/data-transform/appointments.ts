import { Dayjs } from "dayjs";
import { IAppointment } from "src/@types";

export const getDate = (date: string) => date.substring(0, 10);

export const appointmentMapping = (
  appointments: IAppointment[],
  value: Dayjs
) => {
  const filteredAppointments = appointments.filter(
    (item) => getDate(item.selectedDate) === getDate(value.format())
  );

  return [...filteredAppointments].sort(
    (a, b) => Number(a.selectedSlot) - Number(b.selectedSlot)
  );
};
