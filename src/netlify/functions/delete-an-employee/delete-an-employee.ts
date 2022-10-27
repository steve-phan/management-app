import { Handler } from "@netlify/functions";

import { UserServices } from "../utils/services/user.services";

export const handler: Handler = async (event, context) => {
  try {
    const employeeInfo = JSON.parse(event.body!);
    const users = await UserServices.deleteEmployee(employeeInfo);
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
