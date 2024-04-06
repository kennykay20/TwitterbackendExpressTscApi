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
        await this.saveTokenOrCreateUser(emailToken, email, res);
        return res.status(200).json({ token: emailToken });
      }
      // if not found we call the createUser

      emailToken = this.generateEmailToken();
      const saveUserToken = await this.saveTokenOrCreateUser(emailToken, email, res);
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

  saveTokenOrCreateUser = async (token: string, email: string, res: Response) => {
    try {
      await this.prisma.token.create({
        data: {
          tokenType: tokenType.EMAIL,
          token,
          expiration: expirationTime(),
          valid: true,
          user: {
            connectOrCreate: {
              where: {
                email
              },
              create: {
                email,
                username: "",
                fullName: "",
                imageUrl: "",
                bio: "added through login"
              }
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({error: `error occur ${error}`})
    }
  };
}
