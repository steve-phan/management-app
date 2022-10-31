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
  setAppointmentsList,
  setDataViewMoreAppointMentsModal,
  toggleAppointMentDetailsModal,
  toggleEditAppointMentDetailsModal,
} from "src/store";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { allSlots } from "src/Components/shared/data-transform";

import { AppointmentActions } from "./AppointmentActions/AppointmentActions";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

export const AppointmentDetails = () => {
  const [submitEdit, setSubmitEdit] = useState(false);
  const [newPerson, setNewPerson] = useState(0);
  const [newSlot, setNewSlot] = useState("");
  const dispatch = useAppDispatch();
  const { open, appointment, editable, appointmentsList } = useAppSelector(
    (state) => ({
      editable: state.calendar.calendarModal.APPOINTMENT_DETAILS.editable,
      open: state.calendar.calendarModal.APPOINTMENT_DETAILS.open,
      appointment: state.calendar.calendarModal.APPOINTMENT_DETAILS.data as
        | IAppointment
        | undefined,
      appointmentsList: state.calendar.calendarModal.VIEW_MORE_APPOINTMENTS
        .data as unknown as IAppointment[],
    })
  );
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
  const { data, isLoading, error } = useQuery(
    ["appointment/edit-an-appointment", submitEdit],
    async () => {
      if (submitEdit && newPerson) {
        return await axios.post("/.netlify/functions/edit-an-appointment", {
          ...appointment,
          selectedSlot: newSlot,
          person: newPerson,
          shopId: "gao-vegan0410940",
        });
      }
    }
  );

  const [form] = Form.useForm();
  const handleSubmitEdit = () => {
    const newSlot = form.getFieldValue("selectedSlot");
    const newPerson = form.getFieldValue("person");
    setNewPerson(newPerson);
    setNewSlot(newSlot);
    setSubmitEdit(true);
  };
  const cancelEdit = () => {
    dispatch(toggleEditAppointMentDetailsModal(false));
  };

  useEffect(() => {
    if (submitEdit && !isLoading && !error && data?.data && appointment) {
      const newAppointmentList = appointmentsList.map((item) => {
        if (item._id === appointment._id) {
          return {
            ...item,
            person: newPerson,
            selectedSlot: newSlot,
          };
        }
        return item;
      });
      dispatch(toggleEditAppointMentDetailsModal(false));
      dispatch(toggleAppointMentDetailsModal(false));
      dispatch(setDataViewMoreAppointMentsModal(newAppointmentList));
      dispatch(setAppointmentsList(data?.data?.allAppointments));
      setSubmitEdit(false);
    }
  }, [submitEdit, isLoading]);

  return (
    <AppModal
      toggleModal={toggleAppointMentDetailsModal}
      title={<AppointmentActions />}
      open={open}
      onOk={handleSubmitEdit}
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
