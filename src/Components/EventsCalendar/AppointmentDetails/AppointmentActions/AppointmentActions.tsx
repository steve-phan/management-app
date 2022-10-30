import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { IAppointment } from "src/@types";
import { message, Popconfirm, Row } from "antd";
import { setAppointmentsList, toggleAppointMentDetailsModal } from "src/store";

export const AppointmentActions = () => {
  const [submitDelete, setSubmitDelete] = useState(false);
  const dispatch = useAppDispatch();
  const { appointment } = useAppSelector((state) => ({
    appointment: state.calendar.calendarModal.APPOINTMENT_DETAILS
      .data as unknown as IAppointment,
  }));
  const { data, isLoading, error } = useQuery(
    ["appointment/delete-an-appointment", appointment, submitDelete],
    async () => {
      if (submitDelete && appointment) {
        return await axios.post("/.netlify/functions/delete-an-appointment", {
          appointment: { ...appointment, shopId: "gao-vegan0410940" },
        });
      }
    }
  );

  useEffect(() => {
    if (submitDelete && !isLoading && !error) {
      dispatch(setAppointmentsList(data?.data?.allAppointments));
      dispatch(toggleAppointMentDetailsModal(false));
      setSubmitDelete(false);
    }
  }, [submitDelete, isLoading]);

  const handleSubmitDelete = () => {};
  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    setSubmitDelete(true);
    // message.success("Click on Yes");
  };

  return (
    <Row
      justify="end"
      gutter={3}
      style={{
        marginRight: 48,
        marginTop: -16,
      }}
    >
      <span className="appointment-action">
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
