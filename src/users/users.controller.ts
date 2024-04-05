import express from "express";
import { autoInjectable } from "tsyringe";
import { UserService } from "./users.service";

@autoInjectable()
export class UserController {
  private readonly userSvr: UserService;
  constructor(userService: UserService) {
    this.userSvr = userService;
  }

  CreateUser = async (req: express.Request, res: express.Response) => {
    return await this.userSvr.createUser(req, res);
  };

  GetAllUsers = async (req: express.Request, res: express.Response) => {
    return await this.userSvr.getAllUsers(req, res);
  };

  GetUser = async (req: express.Request, res: express.Response) => {
    return await this.userSvr.getUser(req, res);
  };

  UpdateUser = async (req: express.Request, res: express.Response) => {
    return await this.userSvr.updateUser(req, res);
  };

  DeleteUser = async (req: express.Request, res: express.Response) => {
    return await this.userSvr.deleteUser(req, res);
  };
}
