import { Handler } from "@netlify/functions";
import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";
import {
  IEmployeeInfo,
  IEmployeeSignInInfo,
  ROLE,
} from "src/@types/Employee.types";
import { connectMongoDB } from "../utils/config/mogodb";

export const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, add-new-employee function`,
    }),
  };
};
