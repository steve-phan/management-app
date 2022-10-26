import {
  DashboardPage,
  TDashboardPage,
} from "src/store/dashboard/dashboard.reducer";
import { EmployeeDetails } from "../EmployeeDetails/EmployeeDetails";

import { Employees } from "../Employees/Employees";
import { EventsCalendar } from "../EventsCalendar/EventsCalendar";

export const mappingDashBoardPages: Record<TDashboardPage, JSX.Element> = {
  [DashboardPage.EVENTS_CALENDAR]: <EventsCalendar />,
  [DashboardPage.EMPLOYEE_PAGE]: <Employees />,
  [DashboardPage.EMPLOYEE_DETAILS]: <EmployeeDetails />,
};
