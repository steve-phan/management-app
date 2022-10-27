import { Handler } from "@netlify/functions";

import { CommentServices } from "../utils/services/comment.services";

export const handler: Handler = async (event, context) => {
  try {
    const employeeCommentInfo = JSON.parse(event.body!);
    console.log({ employeeCommentInfo });
    const allComments = await CommentServices.addComment(employeeCommentInfo);
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
