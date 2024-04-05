import { Request, Response } from "express";
import { injectable } from "tsyringe";

@injectable()
export class UserService {
  constructor() {}

  createUser = async (req: Request, res: Response) => {
    return "";
  };

  getAllUsers = async (req: Request, res: Response) => {
    return "";
  };

  getUser = async (req: Request, res: Response) => {
    return "";
  };

  updateUser = async (req: Request, res: Response) => {
    return "";
  };

  deleteUser = async (req: Request, res: Response) => {
    return "";
  };
}
