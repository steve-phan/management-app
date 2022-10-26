import { Handler } from "@netlify/functions";

import { UserServices } from "../utils/services/user.services";

export const handler: Handler = async (event, context) => {
  try {
    const { shopid } = event.headers;
    const users = await UserServices.getAllEmployees({ shopId: shopid });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello,  `,
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
