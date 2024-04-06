import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";

@injectable()
export class UserService {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  createUser = async (req: Request, res: Response) => {
    try {
      
      const { email, username, fullName, imageUrl } = req.body;
      console.log(email, username, fullName, imageUrl);
      const result = await this.prisma.user.create({
        data: {
          email: email,
          username: username,
          fullName: fullName,
          bio: `Hello I'm new on twitter`
        }
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      await this.prisma.$disconnect();
      process.exit(1);
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.prisma.user.findMany({
        include: {
          tweets: true
        }
      });
      res.json(users);
    } catch (error) {
      res.status(404).send("error fetching data");
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          tweets: true
        }
      });
      return res.json(user);
    } catch (error) {
      res.status(404).send(`user with ${req.params.id} not found`);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { bio, fullName, imageUrl } = req.body;
      const result = await this.prisma.user.update({
        where: {
          id: Number(id)
        },
        data: { bio, fullName, imageUrl }
      });
      res.json(result);
    } catch (error) {
      res
        .status(400)
        .json({ message: `failed to update the user `, error: error });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    return "";
  };
}
