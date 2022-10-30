import { Typography } from "antd";
import {
  BellOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { IAppointment } from "src/@types";
import { AppModal } from "src/Components/shared/UI/AppModal/AppModal";
import { toggleAppointMentDetailsModal } from "src/store";
import { useAppSelector } from "src/store/hooks";
import { allSlots } from "src/Components/shared/data-transform";

import { AppointmentActions } from "./AppointmentActions/AppointmentActions";

export const AppointmentDetails = () => {
  const { open, appointment } = useAppSelector((state) => ({
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
  return (
    <AppModal
      toggleModal={toggleAppointMentDetailsModal}
      title={<AppointmentActions />}
      open={open}
    >
      <div
        style={{
          paddingBottom: 20,
        }}
      >
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
        <Typography.Paragraph strong>
          <TeamOutlined />
          <span
            style={{
              paddingLeft: 6,
            }}
          >
            {`${person} persons`}
          </span>
        </Typography.Paragraph>
        <Typography.Paragraph strong>
          <BellOutlined />
          <span
            style={{
              paddingLeft: 6,
            }}
          >
            {`${allSlots[Number(selectedSlot)]} ${dayjs(selectedDate).format(
              "dddd, MMM, DD"
            )}`}
          </span>
        </Typography.Paragraph>
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
      </div>
    </AppModal>
  );
};
