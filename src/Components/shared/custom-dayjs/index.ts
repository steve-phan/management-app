import dayjs from "dayjs";

/**
 * @params : month and year (WIP)
 * @returns : string syntax month-year to query data by mongodb
 */
export const getCurrentMonth = (year?: string, month?: string) =>
  `${year ? year : dayjs().year()}-${month ? month : dayjs().month() + 1}`;
