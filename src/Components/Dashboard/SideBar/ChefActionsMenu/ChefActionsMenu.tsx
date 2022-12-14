import { Row } from "antd";
import { EditOutlined, CloudUploadOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { ButtonWithIcon } from "src/Components/shared/UI/ButtonWithIcon/ButtonWithIcon";
import {
  toggleAddEmployeeModal,
  toggleUploadCSVFILEEMPLOYEEModal,
} from "src/store";
import { ROLE } from "src/@types";

export const ChefActionsMenu = () => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.employee.activeEmployee);

  if (role === ROLE.EMPLOYEE) {
    return null;
  }

  return (
    <Row gutter={[0, 12]}>
      {/* <ButtonWithIcon
        icon={<CloudUploadOutlined />}
        onClick={() => {
          dispatch(toggleUploadCSVFILEEMPLOYEEModal(true));
        }}
      >
        Upload Employee file?
      </ButtonWithIcon> */}
      <ButtonWithIcon
        icon={<EditOutlined />}
        onClick={() => {
          dispatch(toggleAddEmployeeModal(true));
        }}
      >
        Add employee?
      </ButtonWithIcon>
    </Row>
  );
};
