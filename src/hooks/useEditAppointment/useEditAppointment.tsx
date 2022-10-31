import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { IAppointment } from "src/@types";
import {
  setAppointmentsList,
  setDataViewMoreAppointMentsModal,
  toggleAppointMentDetailsModal,
  toggleEditAppointMentDetailsModal,
} from "src/store";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

export const useEditAppointment = () => {
  const [submitEdit, setSubmitEdit] = useState(false);
  const [editInfo, setEditInfo] = useState({ newPerson: 0, newSlot: "" });
  const dispatch = useAppDispatch();
  const { appointment, appointmentsList } = useAppSelector((state) => ({
    appointment: state.calendar.calendarModal.APPOINTMENT_DETAILS.data as
      | IAppointment
      | undefined,
    appointmentsList: state.calendar.calendarModal.VIEW_MORE_APPOINTMENTS
      .data as unknown as IAppointment[],
  }));

  const { data, isLoading, error } = useQuery(
    ["appointment/edit-an-appointment", submitEdit],
    async () => {
      if (submitEdit && editInfo.newPerson) {
        return await axios.post("/.netlify/functions/edit-an-appointment", {
          ...appointment,
          selectedSlot: editInfo.newSlot,
          person: editInfo.newPerson,
          shopId: "gao-vegan0410940",
        });
      }
    }
  );

  const handleSubmitEdit = ({
    newPerson,
    newSlot,
  }: {
    newPerson: number;
    newSlot: string;
  }) => {
    setEditInfo({ newPerson, newSlot });
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
            person: editInfo.newPerson,
            selectedSlot: editInfo.newSlot,
          };
        }
        return item;
      });
      message.success("Edit appointment successfully", 0.5).then(() => {
        setSubmitEdit(false);
        dispatch(toggleEditAppointMentDetailsModal(false));
        dispatch(toggleAppointMentDetailsModal(false));
        dispatch(setDataViewMoreAppointMentsModal(newAppointmentList));
        dispatch(setAppointmentsList(data?.data?.allAppointments));
        setSubmitEdit(false);
      });
    }
  }, [submitEdit, isLoading, editInfo.newPerson, , editInfo.newSlot]);
  return {
    handleSubmitEdit,
    cancelEdit,
  };
};
