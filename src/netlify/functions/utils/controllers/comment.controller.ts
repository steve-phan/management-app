import { Request, Response, NextFunction } from "express";

import { CommentServices } from "../services/comment.services";

export class CommentControler {
  static async getAllComments(req: Request, res: Response, next: NextFunction) {
    try {
      const { employeeId, shopId } = req.body;
      const allComments = await CommentServices.getAllComments({
        employeeId,
        shopId,
      });
      res
        .status(200)
        .json({ allComments: allComments || [], message: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  }

  static async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const allComments = await CommentServices.addComment(req.body);
      res.status(200).json({ allComments, message: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  }
}
