import { injectable } from "tsyringe";
import express, { Request, Response } from "express";
import { UserService } from "../users/users.service";
import { PrismaClient } from "@prisma/client";
import {
  tokenType,
  expirationMinute,
  expirationHour,
  userDetails
} from "../utils";
import jwt from "jsonwebtoken";
import { config } from "../config";
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
      let token = null;

      const email = req.body.email;
      // check the email of the user exist
      const isUser = await this.userSvc.getUserByEmail(email);
      // if yes
      if (isUser) {
        // generate a new emailtoken for this user login the user to tweet and do other things
        token = this.generateToken();
        await this.saveTokenOrCreateUser(token, "email", email, res);
        return res.status(200).json({ token: token });
      }
      // if not found we call the saveTokenOrCreateUser
      token = this.generateToken();
      const saveUserToken = await this.saveTokenOrCreateUser(
        token,
        "email",
        email,
        res
      );
      // and send an email token to the user throw sendGrid

      res.status(200).json({ token: token });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  authenticateUser = async (req: Request, res: Response) => {
    try {
      let apiToken = null;
      // validate the emailtoken along with email we receive if not expire and valide
      const { token, email } = req.body;
      const dbEmailToken = await this.prisma.token.findUnique({
        where: {
          token
        },
        include: {
          user: true
        }
      });
      if (!dbEmailToken || !dbEmailToken.valid) {
        return res.status(404).json({ message: "token not found or valid" });
      }
      if (dbEmailToken && email !== dbEmailToken?.user?.email) {
        return res.status(404).json({ message: "email not correct" });
      }
      if (dbEmailToken.expiration && new Date() > dbEmailToken?.expiration) {
        return res.status(404).json({ message: "token expres" });
      }
      await this.saveTokenOrCreateUser(token, 'API', email, res);
      // update the token table set the valid column to false for the current token not expired
      // this is a stateless form
      // await this.prisma.token.update({
      //   where: { id: dbEmailToken.id },
      //   data: { valid: false }
      // });
      // generate a new API JWT token that last longer
      //if (saveToken) {
        //apiToken = await this.generateAuthToken(saveToken.id);
      //}
      
      // save token for 24 hrs long for a user to use
      //await this.saveTokenOrCreateUser(token, "api", email, res);
      res.status(200).json({ token });
      // generate a long-lived JWT token

      // if not we send a 400 error
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  generateToken = (): string => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  generateAuthToken = (tokenId: number) => {
    const payloadToken = { tokenId };
    const secretToken = config.Secret;
    return jwt.sign(payloadToken, secretToken, {
      algorithm: "HS256",
      noTimestamp: true
    });
  };
  saveTokenOrCreateUser = async (
    token: string,
    type: string,
    email: string,
    res: express.Response
  ) => {
    try {
      console.log(`${token}, :: ${type}, : ${email}, : ${res}`);
      await this.prisma.token.create({
        data: {
          tokenType: type === "email" ? tokenType.EMAIL : tokenType.API_TOKEN,
          token: type === "email" ? token : "",
          expiration: type === "email" ? expirationMinute() : expirationHour(),
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
      //return savedToken;
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: `error occur ${error}` });
    }
  };
}
