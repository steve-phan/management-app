import { Handler } from "@netlify/functions";

import { AppointmentServices } from "../utils/services/appointments.services";

export const handler: Handler = async (event, context) => {
  try {
    const { shopid, monthquery } = event.headers as unknown as {
      shopid: string;
      monthquery: string;
    };

    const allAppointments = await AppointmentServices.getAllAppointments({
      shopId: shopid,
      monthQuery: monthquery,
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
