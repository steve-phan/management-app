import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Row } from "antd";

import { useDeleteAppointment } from "src/hooks";

export const AppointmentActions = () => {
  const { handleEdit, confirm } = useDeleteAppointment();

  return (
    <Row
      justify="end"
      gutter={3}
      style={{
        marginRight: 48,
        marginTop: -16,
      }}
    >
      <span onClick={handleEdit} className="appointment-action">
        <EditOutlined size={16} />
      </span>
      <Popconfirm
        title="Are you sure to delete this task?"
        //@ts-ignore
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <span className="appointment-action">
          <DeleteOutlined />
        </span>
      </Popconfirm>
    </Row>
  );
};
