import dayjs from "dayjs";
import { IAppointment } from "src/@types";

/**
 * @params : month and year (WIP)
 * @returns : string syntax month-year to query data by mongodb
 */
export const getCurrentMonth = (year?: string, month?: string) =>
  `${year ? year : dayjs().year()}-${month ? month : dayjs().month() + 1}`;

export const getDate = (date: string) => dayjs(date).date();

export const appointmentMapping = (appointments: IAppointment[]) => {
  let dayObj: any = {};
  appointments.forEach((appointment) => {
    const date = getDate(appointment?.selectedDate);
    if (dayObj[String(date)]) {
      dayObj[String(date)] = [...dayObj[String(date)], appointment];
    } else {
      dayObj[String(date)] = [appointment];
    }
  });
  return dayObj;
};
