import express from "express"; // replcae with dto soon
import { autoInjectable } from "tsyringe";
import { TweetService } from "./tweets.service";

@autoInjectable()
export class TweetController {
  private readonly tweetSvc: TweetService;
  constructor(tweetService: TweetService) {
    this.tweetSvc = tweetService;
  }

  CreateTweet = async (req: express.Request, res: express.Response) => {
    return await this.tweetSvc.createTweet(req, res);
  };

  GetAllTweet = async (req: express.Request, res: express.Response) => {
    return await this.tweetSvc.getAllTweet(req, res);
  };

  GetTweet = async (req: express.Request, res: express.Response) => {
    return await this.tweetSvc.getTweet(req, res);
  };

  // does user update their tweet, we don't know if that be in future
  UpdateTweet = async (req: express.Request, res: express.Response) => {
    return await this.tweetSvc.updateTweet(req, res);
  };

  DeleteTweet = async (req: express.Request, res: express.Response) => {
    return await this.tweetSvc.delteTweet(req, res);
  };
}
