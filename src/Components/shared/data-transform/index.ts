import dayjs, { Dayjs } from "dayjs";

export {
  monthsShort,
  allSlots,
  dateToShowDetailsArray,
} from "./date.constants";
export { appointmentMapping } from "./appointments";
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
