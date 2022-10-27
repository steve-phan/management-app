import { Handler } from "@netlify/functions";

import { CommentServices } from "../utils/services/comment.services";

export const handler: Handler = async (event, context) => {
  try {
    const employeeInfo = JSON.parse(event.body!);
    const allComments = await CommentServices.getAllComments(employeeInfo);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `SUCCESS`,
        allComments,
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
