import { Handler } from "@netlify/functions";
import { connectMongoDB } from "../utils/config/mogodb";
import { AppointmentServices } from "../utils/services/appointments.services";

export const handler: Handler = async (event, context) => {
  try {
    const { shopid, appointmentofmonth } = event.headers as unknown as {
      shopid: string;
      appointmentofmonth: string;
    };

    const allAppointments = await AppointmentServices.getAllAppointments({
      shopId: shopid,
      appointmentOfMonth: appointmentofmonth,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `SUCCESS`,
        appointments: allAppointments,
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
