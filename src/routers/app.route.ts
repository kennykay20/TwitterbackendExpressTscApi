import { AppController } from "../AppTest/apptest.controller";
import express from "express";
import { container } from "tsyringe";

const appCtr = container.resolve(AppController);
export default (router: express.Router) => {
  router.get("/api/v1/app/greeting", appCtr.SayHello);
  return router;
};