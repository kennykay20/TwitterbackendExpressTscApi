import { createClient } from "redis";
import { createHash } from "crypto";
import { config } from "../config";

export class CacheService {
  private client: any;
  constructor() {
    this.client = createClient({
      password: config.Redis.PASSWORD,
      socket: {
        host: config.Redis.HOST,
        port: config.Redis.PORT,
      },
    });
  }

  getHash = (value: any = ""): string => {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    value = value.toString();
    return createHash("md5").update(value).digest("hex");
  };

  save = async (key: string, data: string, duration?: number) => {};
  get = async (key: string) => {};
}
