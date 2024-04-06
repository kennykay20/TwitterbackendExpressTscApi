import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { UserService } from "../users/users.service";
import { PrismaClient } from "@prisma/client";
import { tokenType, expirationTime, userDetails } from "../utils";
@injectable()
export class AuthService {
  private userSvc: UserService;
  private prisma;
  constructor(userService: UserService) {
    this.userSvc = userService;
    this.prisma = new PrismaClient();
  }

  userLogin = async (req: Request, res: Response) => {
    try {
      let emailToken = null;
      let apiToken = null;

      const email = req.body.email;
      // check the email of the user exist
      const isUser = await this.userSvc.getUserByEmail(email);
      // if yes
      if (isUser) {
        // generate a new emailtoken for this user login the user to tweet and do other things
        emailToken = this.generateEmailToken();
        await this.saveToken(emailToken, isUser.id);
        return res.status(200).json({ token: emailToken });
      }
      // if not found we call the createUser
      const userData: userDetails = {
        username: req.body.username,
        email: req.body.email,
        fullName: req.body.fullName,
        imageUrl: req.body.imageUrl ?? ""
      };
      emailToken = this.generateEmailToken();
      const saveUserToken = await this.saveTokenAndCreateUser(
        emailToken,
        userData
      );
      // and send an email token to the user throw sendGrid

      res.status(200).json({ token: emailToken });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  authenticateUser = async (req: Request, res: Response) => {
    try {
      // validate the emailtoken if the along with email we receive if true
      // generate a long-lived JWT token
      // if not we send a 400 error
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  generateEmailToken = (): string => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  saveTokenAndCreateUser = async (token: string, userData: userDetails) => {
    try {
      await this.prisma.token.create({
        data: {
          tokenType: tokenType.EMAIL,
          token,
          expiration: expirationTime().toString(),
          user: {
            connectOrCreate: {
              where: {
                email: userData.email
              },
              create: {
                email: userData.email,
                username: userData.username ?? "",
                fullName: userData.fullName ?? "",
                imageUrl: userData.imageUrl ?? ""
              }
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  saveToken = async (token: string, userId: number) => {
    try {
      await this.prisma.token.create({
        data: {
          tokenType: tokenType.EMAIL,
          token,
          expiration: expirationTime().toString(),
          userId
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}
