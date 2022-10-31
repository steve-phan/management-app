import { Handler } from "@netlify/functions";

import { AppointmentServices } from "../utils/services/appointments.services";

export const handler: Handler = async (event, context) => {
  try {
    const appointment = JSON.parse(event.body!);
    const allAppointments = await AppointmentServices.editAppointment({
      appointment,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `SUCCESS`,
        allAppointments,
      }),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error,
      }),
    };
  }
};
