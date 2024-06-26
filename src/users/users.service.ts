import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";

@injectable()
export class UserService {
  prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  /*
  Test with curl for createUser: if you don't have postman, thunder client extension to test
  curl -X POST -H "Content-Type":"application/json" \
      -d '{"email": "test1@gmail.com", "username": "testify", "fullName": "test kay", "imageUrl": ""}' http://localhost:8082/api/v1/user/register
*/
  createUser = async (req: Request, res: Response) => {
    try {
      const { email, username, fullName, imageUrl } = req.body;
      if (!email ) {
        return res
          .status(400)
          .send("please enter email");
      }

      const result = await this.prisma.user.create({
        data: {
          email,
          username,
          fullName,
          bio: `Hello I'm new on twitter`
        }
      });
      return res.json(result);
    } catch (error) {
      console.log(error);
      await this.prisma.$disconnect();
      return res.sendStatus(400)
      //process.exit(1);
    }
  };
  /*
curl -X GET -H "Content-Type":"application/json" http://localhost:8082/api/v1/users
*/
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          deleteAt: null
        },
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
          id: Number(id),
          deleteAt: null
        },
        include: {
          tweets: true
        }
      });
      return res.json(user);
    } catch (error) {
      res.status(404).send(`user with id ${req.params.id} not found`);
    }
  };
  /*
  Test with curl: 
  curl -X PUT -H "Content-Type":"application/json" \
      -d '{"fullName": "james kay", "bio": "Hello everyone", "imageUrl": ""}'
      http://localhost:8082/api/v1/users/1
*/
  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { bio, fullName, imageUrl } = req.body;
      const result = await this.prisma.user.update({
        where: {
          id: Number(id),
          deleteAt: null
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
  /*
  test with curl for delete

  curl -X DELETE http://localhost:8082/users/:id
*/
  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.prisma.user.update({
        where: { id: Number(id), deleteAt: null },
        data: {
          deleteAt: Date.now().toString()
        }
      });
      res.status(200).send(`user for id ${id} successfully deleted`);
    } catch (error) {
      res
        .status(400)
        .json({ message: `failed to delete the user `, error: error });
    }
  };

  getUserByEmail = async (email: string) => {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email
      },
      select: { id: true }
    });
    return userExist;
  };
}
