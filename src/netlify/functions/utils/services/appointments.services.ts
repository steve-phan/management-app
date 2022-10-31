import dayjs from "dayjs";
import { IAppointment } from "src/@types";

import { connectMongoDB } from "../config/mogodb";
import { appointmentSchema } from "../models/appointment.model";

export class AppointmentServices {
  static async addNewAppointment({
    appointment,
  }: {
    appointment: IAppointment;
  }) {
    const {
      firstName,
      lastName,
      email,
      phone,
      selectedDate,
      selectedSlot,
      person,
      require,
      shopId,
    } = appointment;
    const defaultDb = await connectMongoDB();
    const shopDb = defaultDb.connection.useDb(shopId || "shopDemoId");
    const Appointment = shopDb.model("Appointment", appointmentSchema);

    const newAppointment = new Appointment({
      firstName,
      lastName,
      email,
      phone,
      selectedDate,
      selectedSlot,
      person,
      require,
    });

    await newAppointment.save();

    return await this.getAllAppointments({ shopId, rangeQuery: selectedDate });
  }

  static async editAppointment({ appointment }: { appointment: IAppointment }) {
    const { selectedDate, shopId, _id } = appointment;

    const defaultDb = await connectMongoDB();

    const shopDb = defaultDb.connection.useDb(shopId || "shopDemoId");
    const Appointment = shopDb.model("Appointment", appointmentSchema);
    await Appointment.findOneAndUpdate({ _id }, appointment, { new: true });

    return await this.getAllAppointments({ shopId, rangeQuery: selectedDate });
  }

  static async deleteAppointment({
    appointment,
  }: {
    appointment: IAppointment;
  }) {
    const { selectedDate, shopId, _id } = appointment;
    const defaultDb = await connectMongoDB();

    const shopDb = defaultDb.connection.useDb(shopId || "shopDemoId");
    const Appointment = shopDb.model("Appointment", appointmentSchema);
    await Appointment.findOneAndUpdate(
      { _id },
      { status: true }
      // { new: true }
    );

    return await this.getAllAppointments({ shopId, rangeQuery: selectedDate });
  }

  static async getAllAppointments({
    shopId = "shopDemoId",
    rangeQuery,
  }: {
    shopId?: string;
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
