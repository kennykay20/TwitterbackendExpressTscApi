import express from "express";
import { container } from "tsyringe";
import { UserController } from "../users/users.controller";

const userCtl = container.resolve(UserController);
export default (router: express.Router) => {
  router.post("/api/vi/user", userCtl.CreateUser);
  router.get("/api/v1/users", userCtl.GetAllUsers);
  router.get("/api/v1/user/:id", userCtl.GetUser);
  router.put("/api/v1/user/:id", userCtl.UpdateUser);
  router.delete("/api/v1/user/:id", userCtl.DeleteUser);
  return router;
};
