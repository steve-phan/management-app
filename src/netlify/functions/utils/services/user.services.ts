import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";
import {
  IEmployeeInfo,
  IEmployeeSignInInfo,
  ROLE,
} from "src/@types/Employee.types";
import { connectMongoDB } from "../config/mogodb";
import { shopinfoSchema } from "../models/shopinfo.model";

import User, { employeeSchema } from "../models/user.model";

export class UserServices {
  static async signIn({
    employeeSignInInfo,
  }: {
    employeeSignInInfo: IEmployeeSignInInfo;
  }) {
    const defaultDb = await connectMongoDB();

    const shopDb = defaultDb.connection.useDb("all-employees");
    const Employee = shopDb.model("Employee", employeeSchema);

    const user = await Employee.findOne({
      userName: employeeSignInInfo.userName,
    });
    if (
      user &&
      bcrypt.compareSync(employeeSignInInfo.password, user.password)
    ) {
      const { password, ...userInfo } = user.toObject();
      const shopInfo = (await this.getAllShopsInfo()).find(
        ({ shopId }) => shopId === userInfo.shopId
      );
      return {
        ...userInfo,
        shopInfo,
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

    const employeesDb = defaultDb.connection.useDb("all-employees");
    const Employee = employeesDb.model("Employee", employeeSchema);

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
      role: ROLE.EMPLOYEE,
      shopId: employeeSignUpInfo?.shopId || "shopDemoId",
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
      const shopDb = defaultDb.connection.useDb("all-employees");
      const Employee = shopDb.model("Employee", employeeSchema);
      return await Employee.find().select("-password");
    }
    const allEmployees = await Model.find().select("-password");
    return allEmployees;
  }

  static async getAllShopsInfo() {
    const defaultDb = await connectMongoDB();
    const shopDb = defaultDb.connection.useDb("shopnames");
    const Employee = shopDb.model("shopinfos", shopinfoSchema);
    return (await Employee.find()).map((shopinfo) => shopinfo.toObject());
  }
}
