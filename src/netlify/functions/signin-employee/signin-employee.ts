import { Handler } from "@netlify/functions";
import { UserServices } from "../utils/services/user.services";

export const handler: Handler = async (event, context) => {
  try {
    const employeeSinInInfo = JSON.parse(event.body!);
    const user = await UserServices.signIn(employeeSinInInfo);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `SUCCESS`,
        user,
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
