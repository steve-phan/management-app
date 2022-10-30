import { Button, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { allSlots } from "src/Components/shared/data-transform";
import { setAppointmentsList, toggleAddNewAppointmentModal } from "src/store";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

export const NewAppointment = () => {
  const [appointment, setAppointment] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedDate } = useAppSelector((state) => ({
    selectedDate: state.calendar.calendarModal.ADD_NEW_APPOINTMENT.date,
  }));
  const { isLoading, error, data } = useQuery(
    ["appointment/add-new-appointment", appointment, submitted],
    async () => {
      if (submitted) {
        return await axios.post("/.netlify/functions/add-new-appointment", {
          ...appointment,
          selectedDate,
          shopId: "gao-vegan0410940",
        });
      }
    },
    {
      retry: 1,
    }
  );
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setSubmitted(true);
    setAppointment(values);
  };

  useEffect(() => {
    if (submitted && !isLoading && data?.data?.message === "SUCCESS") {
      setSubmitted(false);
      dispatch(setAppointmentsList(data?.data?.allAppointments));
      dispatch(toggleAddNewAppointmentModal(false));
    }
  }, [data, isLoading]);

  return (
    <Form
      //   layout="vertical"
      layout="horizontal"
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      labelCol={{ span: 6 }}
      //   wrapperCol={{ span: 18 }}
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please input the first Name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please input the last Name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="person"
        label="Persons"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Date"
        rules={[{ required: true, message: "This field is required" }]}
      >
        {String(dayjs(selectedDate).format("dddd, MMM, DD"))}
      </Form.Item>

      <Form.Item
        name="selectedSlot"
        label="Time"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Select>
          {allSlots.map((slot, index) => (
            <Select.Option key={slot} value={index}>
              {slot}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="require" label="Require">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          Submit
        </Button>
      </Form.Item>
      <Form.Item></Form.Item>
    </Form>
  );
};
