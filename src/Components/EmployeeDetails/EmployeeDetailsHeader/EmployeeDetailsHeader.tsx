import { Col, Row, Tag } from "antd";
import { ROLE } from "src/@types";

import { EmployeeAvatar } from "src/Components/Account/EmployeeAvatar/EmployeeAvatar";
import { EmployeeColor } from "src/Components/Employees/Employees.helpers";
import { useAppSelector } from "src/store/hooks";

export const EmployeeDetailsHeader = () => {
  const { firstName, lastName, role, address, _id } = useAppSelector(
    (state) => state.dashboard.employeeDetails.employeeInfo
  );
  return (
    <Row>
      <Col flex="60px">
        <EmployeeAvatar employeeId={_id} />
      </Col>
      <Col
        flex="auto"
        style={{
          textAlign: "left",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {firstName + " " + lastName}
        </p>
        <p
          style={{
            margin: 0,
          }}
        >
          <Tag
            color={EmployeeColor[role]}
            key={role}
            style={{
              fontSize: "8px",
            }}
          >
            {role.toUpperCase()}
          </Tag>
          <span> {address.split(" ").slice(-1)[0]}</span>
        </p>
      </Col>
    </Row>
  );
};
