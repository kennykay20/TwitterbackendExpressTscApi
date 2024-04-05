import { injectable } from "tsyringe";
import { Request, Response } from "express";

@injectable()
export class TweetService {
  constructor() {}

  createTweet = async (req: Request, res: Response) => {
    return "";
  };

  getAllTweet = async (req: Request, res: Response) => {
    return "";
  };

  getTweet = async (req: Request, res: Response) => {
    return "";
  };

  updateTweet = async (req: Request, res: Response) => {
    return "";
  };

  delteTweet = async (req: Request, res: Response) => {
    return "";
  };
}
