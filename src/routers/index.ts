import express from "express";
const router = express.Router();
import userRouter from "./users.route";
import tweetRouter from "./tweet.route";
import authRouter from "./auth.route";

export default (): express.Router => {
  userRouter(router);
  tweetRouter(router);
  authRouter(router);
  return router;
};
