import { connectMongoDB } from "../config/mogodb";
import { appointmentSchema } from "../models/appointment.model";

export class AppointmentServices {
  static async getAllAppointments({
    shopId,
    monthQuery,
  }: {
    shopId: string;
    monthQuery: string;
  }) {
    const defaultDb = await connectMongoDB();
    const shopDb = defaultDb.connection.useDb(shopId || "shopDemoId");
    const Appointment = shopDb.model("Appointment", appointmentSchema);
    const appointmentReg = new RegExp(monthQuery);

    return await Appointment.find({
      selectedDate: { $regex: appointmentReg },
      status: false, // Appointment was canceled
    });
  }
}
