import express from "express";
import { container } from "tsyringe";
import { TweetController } from "../tweets/tweets.controller";

const tweetCtl = container.resolve(TweetController);
export default (router: express.Router) => {
  router.post("/api/vi/tweet", tweetCtl.CreateTweet);
  router.get("/api/v1/tweets", tweetCtl.GetAllTweet);
  router.get("/api/v1/tweets/:id", tweetCtl.GetTweet);
  router.put("/api/v1/tweets/:id", tweetCtl.UpdateTweet);
  router.delete("/api/v1/tweets/:id", tweetCtl.DeleteTweet);
  return router;
};
