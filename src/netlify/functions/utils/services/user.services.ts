import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";
import {
  IEmployeeInfo,
  IEmployeeSignInInfo,
  ROLE,
} from "src/@types/Employee.types";
import { connectMongoDB } from "../config/mogodb";

import User, { employeeSchema } from "../models/user.model";

export class UserServices {
  static async signIn({
    employeeSignInInfo,
  }: {
    employeeSignInInfo: IEmployeeSignInInfo;
  }) {
    const defaultDb = await connectMongoDB();

    const shopDb = defaultDb.connection.useDb(
      employeeSignInInfo?.shopId || "shopDemoId"
    );
    const Employee = shopDb.model("Employee", employeeSchema);

    const user = await Employee.findOne({
      userName: employeeSignInInfo.userName,
    });
    if (
      user &&
      bcrypt.compareSync(employeeSignInInfo.password, user.password)
    ) {
      const { password, ...userInfo } = user.toObject();
      return {
        ...userInfo,
      };
    } else {
      throw `UserName or Password is wrong, please try again!`;
    }
    // TODO: using jwt library to send token back to client
  }

  static async signUp({
    employeeSignUpInfo,
  }: {
    employeeSignUpInfo: IEmployeeInfo;
  }) {
    const defaultDb = await connectMongoDB();

    const shopDb = defaultDb.connection.useDb(
      employeeSignUpInfo?.shopId || "shopDemoId"
    );
    const Employee = shopDb.model("Employee", employeeSchema);

    const existUser = await Employee.findOne({
      $or: [
        { userName: employeeSignUpInfo.userName.toLowerCase() },
        { email: employeeSignUpInfo.email.toLowerCase() },
      ],
    });
    if (existUser) {
      throw `UserName: ${employeeSignUpInfo.userName} or Email: ${employeeSignUpInfo.email} is already taken`;
    }
    const user = new Employee({
      ...employeeSignUpInfo,
      role: [ROLE.EMPLOYEE],
    });
    user.password = bcrypt.hashSync(employeeSignUpInfo.password, 10);
    await user.save();

    return await this.getAllEmployees({ Model: Employee });
  }
  static async deleteEmployee({
    email,
    shopId,
  }: {
    email: string;
    shopId?: string;
  }) {
    const defaultDb = await connectMongoDB();

    const shopDb = defaultDb.connection.useDb(shopId || "shopDemoId");
    const Employee = shopDb.model("Employee", employeeSchema);
    await Employee.deleteOne({ email });
    return await this.getAllEmployees({ Model: Employee });
  }

  static async editEmployee({
    employeeSignUpInfo,
  }: {
    employeeSignUpInfo: IEmployeeInfo;
  }) {
    await User.findOneAndUpdate(
      { email: employeeSignUpInfo.email },
      employeeSignUpInfo
    );
    const defaultDb = await connectMongoDB();

    const shopDb = defaultDb.connection.useDb(
      employeeSignUpInfo?.shopId || "shopDemoId"
    );
    const Employee = shopDb.model("Employee", employeeSchema);
    await Employee.deleteOne({ email: employeeSignUpInfo.email });

    return await this.getAllEmployees({ Model: Employee });
  }

  static async getAllEmployees({
    Model,
    shopId,
  }: {
    Model?: Model<any>;
    shopId?: string;
  }) {
    if (!Model) {
      const defaultDb = await connectMongoDB();
      const shopDb = defaultDb.connection.useDb(shopId || "shopDemoId");
      const Employee = shopDb.model("Employee", employeeSchema);
      return await Employee.find().select("-password");
    }
    const allEmployees = await Model.find().select("-password");
    return allEmployees;
  }
}
