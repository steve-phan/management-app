import { Handler } from "@netlify/functions";

import { AppointmentServices } from "../utils/services/appointments.services";

export const handler: Handler = async (event, context) => {
  try {
    const { shopid, rangequery } = event.headers as unknown as {
      shopid: string;
      rangequery: string;
    };

    const allAppointments = await AppointmentServices.getAllAppointments({
      shopId: shopid,
      rangeQuery: rangequery,
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
