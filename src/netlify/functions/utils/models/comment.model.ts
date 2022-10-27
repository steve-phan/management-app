import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const detailsCommentSchema = {
  authorId: String,
  author: String,
  commentAt: Date,
  content: String,
};

export const commentSchema = new Schema({
  employeeId: String,
  comments: [detailsCommentSchema],
});

export default mongoose.model("Comment", commentSchema);
