import { CacheService } from "../Cache/cache.service";
import { autoInjectable } from "tsyringe";
import express, { NextFunction } from "express";
import { send } from "process";

@autoInjectable()
export class AuthMiddleware {
  private cacheSvc: CacheService;
  constructor(cacheService: CacheService) {
    this.cacheSvc = cacheService;
  }

  IsUserOwnerHandler = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const currentUserCache = await this.cacheSvc.getUserExist(id);
      if (!currentUserCache) {
        return res.status(403).send("not authenticated");
      }

      if (currentUserCache["id"] !== id) {
        return res.status(403).send("cannot delete tweet");
      }
      next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
}
