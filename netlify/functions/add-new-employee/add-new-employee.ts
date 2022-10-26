import { Handler } from "@netlify/functions";
import {
  IEmployeeInfo,
  IEmployeeSignInInfo,
  UserServices,
} from "../utils/services/user.services";

export const handler: Handler = async (event, context) => {
  // const { name = 'stranger' } = event.queryStringParameters
  // console.log({ event: JSON.parse(event.body) });
  const employeeSignUpInfo = JSON.parse(event.body!) as unknown as {
    employeeSignUpInfo: IEmployeeInfo;
  };
  const users = await UserServices.signUp(employeeSignUpInfo);
  console.log({ employeeSignUpInfo });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello,  !`,
      users: users,
    }),
  };
};
