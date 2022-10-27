import { Handler } from "@netlify/functions";
import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";
import {
  IEmployeeInfo,
  IEmployeeSignInInfo,
  ROLE,
} from "src/@types/Employee.types";
import { connectMongoDB } from "../utils/config/mogodb";
import { UserServices } from "../utils/services/user.services";

export const handler: Handler = async (event, context) => {
  try {
    const employeeInfo = JSON.parse(event.body!);
    const users = await UserServices.editEmployee(employeeInfo);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `SUCCESS`,
        users,
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
