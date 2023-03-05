import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

import { FeedbackService } from "../feedback.service";

const getAllFeedbacks = async (_req: Request, res: Response) => {
  const feedbacks = await FeedbackService.getAllFeedbacks();

  return res.status(200).json(feedbacks);
};

export default {
  route: getAllFeedbacks,
  method: "get",
  path: "/all/",
} as IRouteConfig;