import { Row } from "antd";
import { CalendarOutlined, UsergroupAddOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { ButtonWithIcon } from "src/Components/shared/UI/ButtonWithIcon/ButtonWithIcon";
import {
  toggleAddEmployeeModal,
  toggleUploadCSVFILEEMPLOYEEModal,
} from "src/store";
import { ROLE } from "src/@types";

export const EmployeeActionsMenu = () => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.employee.activeEmployee);

  if (!role.includes(ROLE.CHEF)) {
    return null;
  }

  return (
    <Row gutter={[0, 12]}>
      <ButtonWithIcon
        icon={<UsergroupAddOutlined />}
        onClick={() => {
          //   dispatch(toggleUploadCSVFILEEMPLOYEEModal(true));
          console.log("Show Employees");
        }}
      >
        Employees
      </ButtonWithIcon>
      <ButtonWithIcon
        icon={<CalendarOutlined />}
        onClick={() => {
          //   dispatch(toggleAddEmployeeModal(true));
          console.log("Show calendar events");
        }}
      >
        Calendar Events
      </ButtonWithIcon>
    </Row>
  );
};
