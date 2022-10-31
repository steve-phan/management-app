import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { IAppointment } from "src/@types";
import {
  setAppointmentsList,
  setDataViewMoreAppointMentsModal,
  toggleAppointMentDetailsModal,
  toggleEditAppointMentDetailsModal,
} from "src/store";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

export const useDeleteAppointment = () => {
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
      message.success("Delete appointment successfully", 0.5).then(() => {
        const newAppointmentList = appointmentsList.filter(
          (item) => item._id !== appointment._id
        );
        dispatch(setDataViewMoreAppointMentsModal(newAppointmentList));
        dispatch(setAppointmentsList(data?.data?.allAppointments));
        dispatch(toggleAppointMentDetailsModal(false));
        setSubmitDelete(false);
      });
    }
  }, [submitDelete, isLoading]);
  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    setSubmitDelete(true);
  };

  const handleEdit = () => {
    dispatch(toggleEditAppointMentDetailsModal(true));
  };

  return {
    confirm,
    handleEdit,
  };
};
