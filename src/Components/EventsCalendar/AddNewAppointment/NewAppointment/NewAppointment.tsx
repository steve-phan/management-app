import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";

import { allSlots } from "src/Components/shared/custom-dayjs";
import { useAppSelector } from "src/store/hooks";

export const NewAppointment = () => {
  //   const { error, isLoading, onSubmitActiveEmployee } = useSignUpEmployee({
  //     type,
  //   });
  const { role } = useAppSelector((state) => state.employee.activeEmployee);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // onSubmitActiveEmployee(values);
    console.log({ values });
  };

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
        name="persons"
        label="Persons"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="time"
        label="Time"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Select>
          {allSlots.map((slot, index) => (
            <Select.Option key={slot} value={slot}>
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
          //   loading={isLoading}
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
