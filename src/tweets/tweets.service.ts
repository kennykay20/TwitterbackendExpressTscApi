import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import shortUUID from "short-uuid";

@injectable()
export class TweetService {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  createTweet = async (req: Request, res: Response) => {
    try {
      const { userId, content, imageUrl } = req.body;
      if (!userId || !content) {
        return res.status(400).send("no content or userid");
      }
      // using the user middleware
      // TODO: we will check if the userid from the token equals the userid from the user table
      // if not You have no access to create a tweet
      const result = await this.prisma.tweet.create({
        data: {
          id: shortUUID.generate(),
          userId, // will be taken from the auth token soon
          content,
          imageUrl
        }
      });
      // pick the
      res.json(result);
    } catch (error) {
      console.log(error);
      await this.prisma.$disconnect();
      process.exit(1);
    }
  };

  getAllTweet = async (req: Request, res: Response) => {
    try {
      const allTweet = await this.prisma.tweet.findMany();
      res.json(allTweet);
    } catch (error) {
      res.status(404).send("error fetching data");
    }
  };

  getTweet = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      // check from the token ifthe id equalts the if for this user
      const tweet = await this.prisma.tweet.findUnique({
        where: {
          id
        }
      });
      if (!tweet) {
        return res.status(404).json({ error: "tweet not found!" });
      }
      res.json(tweet);
    } catch (error) {
      return res.status(404).send(`tweet with id ${req.params.id} not found`);
    }
  };

  updateTweet = async (req: Request, res: Response) => {
    return "";
  };

  delteTweet = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.prisma.tweet.delete({
        where: { id }
      });
      res.status(200).json({ message: "tweet deleted successfully!" });
    } catch (error) {
      return res.sendStatus(400);
    }
  };
}
