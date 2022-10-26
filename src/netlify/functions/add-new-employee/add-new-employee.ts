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
  const employeeInfo = JSON.parse(event.body!);
  const user = UserServices.signUp(employeeInfo);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, add-new-employee function`,
    }),
  };
};
