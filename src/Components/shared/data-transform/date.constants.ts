import dayjs from "dayjs";

export const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const morningSlots = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];
export const afternoonSlots = [
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

export const allSlots = [...morningSlots, ...afternoonSlots];
export const dateToShowDetailsArray = [
  dayjs().format("YYYY-MM-DD"),
  dayjs().add(1, "day").format("YYYY-MM-DD"),
  dayjs().add(2, "day").format("YYYY-MM-DD"),
  dayjs().add(3, "day").format("YYYY-MM-DD"),
];
