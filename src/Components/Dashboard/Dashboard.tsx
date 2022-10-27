import { Layout, Typography } from "antd";
import { useState } from "react";

import { useAppSelector } from "src/store/hooks";

import { DashboardPage } from "src/store/dashboard/dashboard.reducer";
import { EmployeeAccount } from "../Account/EmployeeAccount";
import { EmployeeAvatar } from "../Account/EmployeeAvatar/EmployeeAvatar";
import { mappingDashBoardPages } from "./Dashboard.helpers";
import {
  headerLogoStyles,
  headerStyles,
  sliderStyles,
} from "./Dashboard.styles";
import { DashBoardModalGroup } from "./DashBoardModalGroup/DashBoardModalGroup";
import { SideBar } from "./SideBar/SideBar";

const { Header, Footer, Sider, Content } = Layout;

export const Dashboard = () => {
  const [collap, setCollop] = useState(false);
  const { isEmployeeLogin, employeeId, dashboardPage } = useAppSelector(
    (state) => {
      return {
        employeeId: state.employee.activeEmployee._id,
        isEmployeeLogin: state.employee.activeEmployee.isEmployeeLogin,
        dashboardPage: state.dashboard.dashboardPage,
      };
    }
  );

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
          {mappingDashBoardPages[dashboardPage]}
        </Content>
        {!isEventCalendarPage && (
          <Footer>©{new Date().getFullYear()} Amzing gmbh</Footer>
        )}
      </Layout>
    </Layout>
  );
};
