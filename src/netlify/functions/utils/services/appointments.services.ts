import { connectMongoDB } from "../config/mogodb";
import { appointmentSchema } from "../models/appointment.model";

export class AppointmentServices {
  static async getAllAppointments({
    shopId,
    appointmentOfMonth,
  }: {
    shopId: string;
    appointmentOfMonth: string;
  }) {
    const defaultDb = await connectMongoDB();
    const shopDb = defaultDb.connection.useDb(shopId || "shopDemoId");
    const Appointment = shopDb.model("Appointment", appointmentSchema);
    const appointmentReg = new RegExp(appointmentOfMonth);

    return await Appointment.find({
      selectedDate: { $regex: appointmentReg },
    });
  }
}
