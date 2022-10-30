import { Layout, Typography } from "antd";
import { useState } from "react";

import { useGetAllAppointments } from "src/hooks";
import { useAppSelector } from "src/store/hooks";
import { DashboardPage } from "src/store/dashboard/dashboard.reducer";

import { EmployeeAccount } from "../Account/EmployeeAccount";
import { EmployeeAvatar } from "../Account/EmployeeAvatar/EmployeeAvatar";
import {
  headerLogoStyles,
  headerStyles,
  sliderStyles,
} from "./Dashboard.styles";
import { DashBoardModalGroup } from "./DashBoardModalGroup/DashBoardModalGroup";
import { SideBar } from "./SideBar/SideBar";
import { AppointmentDetails } from "../EventsCalendar/AppointmentDetails/AppointmentDetails";
import { ViewMoreAppointments } from "../EventsCalendar/ViewMoreAppointments/ViewMoreAppointments";
import { AddNewAppointment } from "../EventsCalendar/AddNewAppointment/AddNewAppointment";
import { EmployeeDetails } from "../EmployeeDetails/EmployeeDetails";

import { Employees } from "../Employees/Employees";
import { MemoEventsCalendar } from "../EventsCalendar/EventsCalendar";

const { Header, Footer, Sider, Content } = Layout;

export const Dashboard = () => {
  const [collap, setCollop] = useState(false);
  const {
    isEmployeeLogin,
    employeeId,
    dashboardPage,
    appointmentDetailsModal,
    viewMoreAppointmentsModal,
    addNewAppointment,
    appointmentsList,
    rangeQuery,
  } = useAppSelector((state) => {
    return {
      employeeId: state.employee.activeEmployee._id,
      isEmployeeLogin: state.employee.activeEmployee.isEmployeeLogin,
      dashboardPage: state.dashboard.dashboardPage,
      rangeQuery: state.calendar.appointmentRangeQuery,
      appointmentsList: state.calendar.appointmentsList,
      appointmentDetailsModal:
        state.calendar.calendarModal.APPOINTMENT_DETAILS.open,
      viewMoreAppointmentsModal:
        state.calendar.calendarModal.VIEW_MORE_APPOINTMENTS.open,
      addNewAppointment: state.calendar.calendarModal.ADD_NEW_APPOINTMENT.open,
    };
  });
  const { data, isLoading } = useGetAllAppointments(rangeQuery);

  const isEventCalendarPage = dashboardPage === DashboardPage.EVENTS_CALENDAR;

  if (!isEmployeeLogin) {
    return <EmployeeAccount />;
  }

  return (
    <Layout>
      <DashBoardModalGroup />
      <Sider
        theme="dark"
        breakpoint="sm"
        collapsible
        collapsedWidth="30"
        onCollapse={(col) => {
          setCollop(col);
        }}
        style={{
          ...sliderStyles,
        }}
      >
        {!collap && <SideBar />}
      </Sider>
      <Layout
        style={{
          maxWidth: collap ? `calc(100% - 30px)` : `calc(100% - 200px)`,
          marginLeft: "auto",
          height: "100vh",
        }}
      >
        {!isEventCalendarPage && (
          <Header style={headerStyles}>
            <Typography.Paragraph strong style={headerLogoStyles}>
              Amazing gbmh
            </Typography.Paragraph>
            <EmployeeAvatar employeeId={employeeId} />
          </Header>
        )}
        <Content
          style={{
            padding: isEventCalendarPage ? "0 16px" : 16,
            background: "white",
            position: "relative",
            height: `calc(100vh - 64px)`,
          }}
        >
          {appointmentDetailsModal && <AppointmentDetails />}
          {viewMoreAppointmentsModal && <ViewMoreAppointments />}
          {addNewAppointment && <AddNewAppointment />}
          {dashboardPage === DashboardPage.EMPLOYEE_DETAILS && (
            <EmployeeDetails />
          )}
          {dashboardPage === DashboardPage.EMPLOYEE_PAGE && <Employees />}

          {dashboardPage === DashboardPage.EVENTS_CALENDAR && (
            <MemoEventsCalendar
              appointmentsList={appointmentsList}
              data={data}
              isLoading={isLoading}
              rangeQuery={rangeQuery}
            />
          )}
        </Content>
        {!isEventCalendarPage && (
          <Footer>©{new Date().getFullYear()} Amzing gmbh</Footer>
        )}
      </Layout>
    </Layout>
  );
};
