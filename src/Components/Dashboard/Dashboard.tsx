import { Layout, Typography } from "antd";
import { useState } from "react";

import { useAppSelector } from "src/store/hooks";

import { EmployeeAccount } from "../Account/EmployeeAccount";
import { EmployeeAvatar } from "../Account/EmployeeAvatar/EmployeeAvatar";
import { DashBoardModalGroup } from "./DashBoardModalGroup/DashBoardModalGroup";
import { SideBar } from "./SideBar/SideBar";
import {
  sliderStyles,
  headerStyles,
  headerLogoStyles,
} from "./Dashboard.styles";
import { mappingDashBoardPages } from "./Dashboard.helpers";
import { useQuery } from "react-query";
import axios from "axios";
import { getCurrentMonth } from "../shared/custom-dayjs";

const { Header, Footer, Sider, Content } = Layout;

export const Dashboard = () => {
  const [collap, setCollop] = useState(false);
  const { isEmployeeLogin, openEmployeePage, employeeId, dashboardPage } =
    useAppSelector((state) => {
      return {
        employeeId: state.employee.activeEmployee._id,
        isEmployeeLogin: state.employee.activeEmployee.isEmployeeLogin,
        openEmployeePage: state.dashboard.employeeDetails.open,
        dashboardPage: state.dashboard.dashboardPage,
      };
    });

  const { data, isLoading } = useQuery(["checkAuth"], async () => {
    return await axios.get("/.netlify/functions/get-all-appointments", {
      headers: {
        shopId: "gao-vegan0410940",
        appointmentOfMonth: getCurrentMonth(),
      },
    });
  });

  if (!isEmployeeLogin) {
    return <EmployeeAccount />;
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
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
        }}
      >
        <Header style={headerStyles}>
          <Typography.Paragraph strong style={headerLogoStyles}>
            Amazing gbmh
          </Typography.Paragraph>
          <EmployeeAvatar employeeId={employeeId} />
        </Header>
        <Content
          style={{
            padding: 16,
            background: "white",
          }}
        >
          {/* {openEmployeePage ? <EmployeeDetails /> : <Employees />} */}
          {mappingDashBoardPages[dashboardPage]}
        </Content>
        <Footer>©{new Date().getFullYear()} Amzing gmbh</Footer>
      </Layout>
    </Layout>
  );
};
