import { Request, Response } from "express";
import { IRouteConfig } from "../../../types/routeConfig.type";

import { NotificationService } from "../notification.service";

export const getAllNotifications = async (req: Request, res: Response) => {
  const { userId } = req.params;

  console.log("userId", userId);

  const notifications = await NotificationService.getAllNotifications(userId);

  return res.status(200).json(notifications);
};

export default {
  route: getAllNotifications,
  method: "get",
  path: "/all/:userId",
} as IRouteConfig;