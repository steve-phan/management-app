import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import axios from "axios";
import { useAppSelector } from "src/store/hooks";
import { IAppointment } from "src/@types";

export const AppointmentActions = () => {
  const { appointment } = useAppSelector((state) => ({
    appointment: state.calendar.calendarModal.APPOINTMENT_DETAILS
      .data as unknown as IAppointment,
  }));
  const [submitDelete, setSubmitDelete] = useState(false);
  const { data, isLoading } = useQuery(
    ["appointment/delete-an-appointment", appointment, submitDelete],
    async () => {
      if (submitDelete && appointment) {
        return await axios.post("/.netlify/functions/delete-an-appointment", {
          appointment: { ...appointment, shopId: "gao-vegan0410940" },
        });
      }
    }
  );

  const handleSubmit = () => {
    setSubmitDelete(true);
  };

  return <div onClick={handleSubmit}>delte</div>;
};
