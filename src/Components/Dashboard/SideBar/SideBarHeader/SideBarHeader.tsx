import { Row } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { ButtonWithIcon } from "src/Components/shared/ButtonWithIcon/ButtonWithIcon";
import { setEmployeeInfoPage, toggleEmployeeDetails } from "src/store";

import { containerGroupSideBarStyles } from "../SideBar.styles";
import {
  DashboardPage,
  setDashBoardPage,
} from "src/store/dashboard/dashboard.reducer";

export const SideBarHeader = () => {
  const dispatch = useAppDispatch();
  const activeEmployee = useAppSelector(
    (state) => state.employee.activeEmployee
  );
  return (
    <div style={containerGroupSideBarStyles}>
      <Row gutter={[0, 12]}>
        <ButtonWithIcon
          icon={<HomeOutlined />}
          onClick={() => {
            // dispatch(toggleEmployeeDetails(false));
            dispatch(setDashBoardPage(DashboardPage.EVENTS_CALENDAR));
          }}
        >
          Home
        </ButtonWithIcon>
        <ButtonWithIcon
          icon={<HomeOutlined />}
          onClick={() => {
            // dispatch(toggleEmployeeDetails(false));
            dispatch(setDashBoardPage(DashboardPage.EMPLOYEE_PAGE));
          }}
        >
          Employees
        </ButtonWithIcon>
        <ButtonWithIcon
          icon={<UserOutlined />}
          onClick={() => {
            dispatch(setEmployeeInfoPage(activeEmployee));
            // dispatch(toggleEmployeeDetails(true));
            dispatch(setDashBoardPage(DashboardPage.EMPLOYEE_DETAILS));
          }}
        >
          My profile
        </ButtonWithIcon>
      </Row>
    </div>
  );
};
