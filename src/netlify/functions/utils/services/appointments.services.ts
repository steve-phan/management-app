import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";
import {
  IEmployeeInfo,
  IEmployeeSignInInfo,
  ROLE,
} from "src/@types/Employee.types";
import { connectMongoDB } from "../config/mogodb";
import { appointmentSchema } from "../models/appointment.model";

import User, { employeeSchema } from "../models/user.model";

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
