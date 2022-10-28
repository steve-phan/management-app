import dayjs from "dayjs";

import { connectMongoDB } from "../config/mogodb";
import { appointmentSchema } from "../models/appointment.model";

export class AppointmentServices {
  static async getAllAppointments({
    shopId,
    rangeQuery,
  }: {
    shopId: string;
    rangeQuery: string;
  }) {
    const defaultDb = await connectMongoDB();
    const shopDb = defaultDb.connection.useDb(shopId || "shopDemoId");
    const Appointment = shopDb.model("Appointment", appointmentSchema);

    const currentDateQuery = dayjs(rangeQuery).date();

    const startRangeQuery = dayjs(rangeQuery)
      .add(-(currentDateQuery + 30), "days")
      .format("YYYY-MM-DD");
    const endRangeQuery = dayjs(rangeQuery)
      .add(currentDateQuery + 30, "days")
      .format("YYYY-MM-DD");

    return await Appointment.find({
      selectedDate: {
        $gte: startRangeQuery,
        $lt: endRangeQuery,
      },
      status: false, // Appointment was canceled
    });
  }
}
