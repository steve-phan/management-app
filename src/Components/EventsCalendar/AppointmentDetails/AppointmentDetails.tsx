import { Form, Input, Select, Typography } from "antd";
import {
  TeamOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { IAppointment } from "src/@types";
import { AppModal } from "src/Components/shared/UI/AppModal/AppModal";
import {
  toggleAppointMentDetailsModal,
  toggleEditAppointMentDetailsModal,
} from "src/store";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { allSlots } from "src/Components/shared/data-transform";

import { AppointmentActions } from "./AppointmentActions/AppointmentActions";

export const AppointmentDetails = () => {
  const dispatch = useAppDispatch();
  const { open, appointment, editable } = useAppSelector((state) => ({
    editable: state.calendar.calendarModal.APPOINTMENT_DETAILS.editable,
    open: state.calendar.calendarModal.APPOINTMENT_DETAILS.open,
    appointment: state.calendar.calendarModal.APPOINTMENT_DETAILS.data as
      | IAppointment
      | undefined,
  }));

  const {
    firstName,
    lastName,
    selectedSlot,
    selectedDate,
    person,
    require,
    email,
    phone,
    _id,
  } = appointment as IAppointment;

  const [form] = Form.useForm();
  const submitEdit = () => {
    dispatch(toggleEditAppointMentDetailsModal(false));
  };
  const cancelEdit = () => {
    dispatch(toggleEditAppointMentDetailsModal(false));
  };
  return (
    <AppModal
      toggleModal={toggleAppointMentDetailsModal}
      title={<AppointmentActions />}
      open={open}
      onOk={submitEdit}
      showModalFooter={editable}
      onCancel={cancelEdit}
    >
      <div
        style={{
          paddingBottom: 20,
        }}
      >
        <Form
          layout="vertical"
          form={form}
          name="register"
          // onFinish={onFinish}
          initialValues={{
            person,
            selectedSlot: allSlots[Number(selectedSlot)],
          }}
          scrollToFirstError
        >
          <Form.Item>
            <Typography.Paragraph strong underline>
              <CalendarOutlined />
              <span
                style={{
                  paddingLeft: 6,
                }}
              >
                {`${firstName} ${lastName}`}
              </span>
            </Typography.Paragraph>
          </Form.Item>
          <Form.Item
            name={"person"}
            label={
              <>
                <TeamOutlined />
                &nbsp; Person
              </>
            }
          >
            <Input disabled={!editable} contentEditable={editable} />
          </Form.Item>
          <Form.Item
            name="selectedSlot"
            label={
              <>
                <ClockCircleOutlined />
                &nbsp; Time
              </>
            }
          >
            <Select disabled={!editable}>
              {allSlots.map((slot, index) => (
                <Select.Option key={slot} value={index}>
                  {slot}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            rules={[{ required: true, message: "This field is required" }]}
          >
            {String(dayjs(selectedDate).format("dddd, MMM, DD"))}
          </Form.Item>

          <Form.Item>
            <Typography.Paragraph>
              <MailOutlined />
              <span
                style={{
                  paddingLeft: 6,
                }}
              >
                {email}
              </span>
            </Typography.Paragraph>
          </Form.Item>
          <Form.Item>
            <Typography.Paragraph>
              <PhoneOutlined />
              <span
                style={{
                  paddingLeft: 6,
                }}
              >
                {phone}
              </span>
            </Typography.Paragraph>
          </Form.Item>
          <Form.Item>
            <Typography.Text type="danger">
              <InfoCircleOutlined />
              <span
                style={{
                  paddingLeft: 6,
                }}
              >
                {require ? require : "No require"}
              </span>
            </Typography.Text>
          </Form.Item>
        </Form>
      </div>
    </AppModal>
  );
};
