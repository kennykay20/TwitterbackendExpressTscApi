import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import shortUUID from "short-uuid";

@injectable()
export class TweetService {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient()
  }

  createTweet = async (req: Request, res: Response) => {
    try {
      const { userId, content, imageUrl } = req.body;
      const result = await this.prisma.tweet.create({
        data: {
          id: shortUUID.generate(),
          userId, // will be taken from the auth token soon
          content,
          imageUrl,
        }
      });
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
      const tweet = await this.prisma.tweet.findUnique({
        where: {
          id,
        },
      });
      return res.json(tweet);
    } catch (error) {
      res.status(404).send(`tweet with id ${req.params.id} not found`);
    }
  };

  updateTweet = async (req: Request, res: Response) => {
    return "";
  };

  delteTweet = async (req: Request, res: Response) => {
    return "";
  };
}
