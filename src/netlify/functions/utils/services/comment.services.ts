import { connectMongoDB } from "../config/mogodb";
import Comment, { commentSchema } from "../models/comment.model";

interface IAddComment {
  shopId: string;
  employeeId: string;
  comment: {
    authorId: string;
    author: string;
    content: string;
  };
}

export class CommentServices {
  static async getAllComments({
    employeeId,
    shopId,
  }: {
    employeeId: string;
    shopId: string;
  }) {
    const defaultDb = await connectMongoDB();

    const shopDb = defaultDb.connection.useDb(shopId);
    const Comment = shopDb.model("Comment", commentSchema);

    const allComents = await Comment.find({ employeeId });

    return allComents[0];
  }

  static async addComment(commentInfo: IAddComment) {
    const {
      shopId,
      employeeId,
      comment: { author, authorId, content },
    } = commentInfo;
    const defaultDb = await connectMongoDB();

    const shopDb = defaultDb.connection.useDb(shopId);
    const Comment = shopDb.model("Comment", commentSchema);

    const employeeComments = await Comment.findOne({ employeeId });

    if (!employeeComments) {
      const newComment = new Comment({
        employeeId,
        comments: [],
      });
      await newComment.save();
    }

    await Comment.updateOne(
      { employeeId },
      {
        $push: {
          comments: { author, authorId, content, commentAt: new Date() },
        },
      }
    );

    return await this.getAllComments({ employeeId, shopId });
  }
}
