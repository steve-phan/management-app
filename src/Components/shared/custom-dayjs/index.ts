import dayjs, { Dayjs } from "dayjs";

import { IAppointment } from "src/@types";

export { monthsShort, allSlots } from "./date.constants";
/**
 * @params : month and year (WIP)
 * @returns : string syntax month-year to query data by mongodb
 */
export const getCurrentMonth = (event?: Dayjs) => {
  if (event) {
    const newmMonth =
      event.month() > 8 ? event.month() + 1 : `0${event.month() + 1}`;
    return `${event.year()}-${newmMonth}`;
  }
  return `${dayjs().year()}-${dayjs().month() + 1}`;
};

export const getDate = (date: string) => date.substring(0, 10);

export const appointmentMapping = (appointments: IAppointment[]) => {
  let dayObj: any = {};
  appointments?.forEach((appointment) => {
    const date = getDate(appointment?.selectedDate);
    if (dayObj[String(date)]) {
      dayObj[String(date)] = [...dayObj[String(date)], appointment];
    } else {
      dayObj[String(date)] = [appointment];
    }
  });
  return dayObj;
};
