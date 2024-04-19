import { Request, Response } from "express";

export class AppController {
  SayHello = (req: Request, res: Response) => {
    return res.send("Hello world");
  };
}
