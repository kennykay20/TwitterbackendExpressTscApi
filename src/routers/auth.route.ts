import { AuthController } from "../Authorization/auth.controller";
import express from "express";
import { container } from "tsyringe";

const authCtr = container.resolve(AuthController);
export default (router: express.Router) => {
  router.post("/api/v1/");
  router.get("/api/v1");
  return router;
};
