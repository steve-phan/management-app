import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { IAppointment } from "src/@types";
import { message, Popconfirm, Row } from "antd";
import {
  setAppointmentsList,
  setDataViewMoreAppointMentsModal,
  toggleAppointMentDetailsModal,
} from "src/store";

export const AppointmentActions = () => {
  const [submitDelete, setSubmitDelete] = useState(false);
  const dispatch = useAppDispatch();
  const { appointment, appointmentsList } = useAppSelector((state) => ({
    appointment: state.calendar.calendarModal.APPOINTMENT_DETAILS
      .data as unknown as IAppointment,
    appointmentsList: state.calendar.calendarModal.VIEW_MORE_APPOINTMENTS
      .data as unknown as IAppointment[],
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
      message.success("Delete appointment successfully");
      const newAppointmentList = appointmentsList.filter(
        (item) => item._id !== appointment._id
      );
      dispatch(setDataViewMoreAppointMentsModal(newAppointmentList));
      dispatch(setAppointmentsList(data?.data?.allAppointments));
      dispatch(toggleAppointMentDetailsModal(false));
      setSubmitDelete(false);
    }
  }, [submitDelete, isLoading]);

  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    setSubmitDelete(true);
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
