import { Request, Response } from "express";

import { UserService } from "../user.service";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserService.createUser(id);

  return res.json(user);
};