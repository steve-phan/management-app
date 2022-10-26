import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  try {
    const x = event.headers.shopid;
    console.log({ x });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello!`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `Hello!`,
      }),
    };
  }
};
