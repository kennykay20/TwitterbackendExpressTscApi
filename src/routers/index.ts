import express from "express";
const router = express.Router();
import userRouter from "./users.route";
import tweetRouter from "./tweet.route";

export default (): express.Router => {
  userRouter(router);
  tweetRouter(router);
  return router;
};
