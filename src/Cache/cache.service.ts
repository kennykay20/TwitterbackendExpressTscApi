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

  save = async (key: string, data: string, duration?: number) => {
    try {
      await this.client.connect();
      if (duration) {
        return this.client.set(key, data, 'EX', duration);
      } else {
        return this.client.set(key, data);
      }
    } catch (error) {
      this.client.on('error', (error:Error) => console.log('<:: Redis Client Error', error));
    }
  };

  get = async (key: string) => {
    try {
      await this.client.connect();
      return this.client.get(key);
    } catch (error) {
      this.client.on('error', (error: Error) => console.log('<:: Redis Client Error', error));
    }
  };

  del = async (key: string): Promise<unknown> => {
    return this.client.del(key);
  };

  saveUserExist = async (key: string, data: any) => {
    const hash = this.getHash(key);
    const newKey = `api::usertweet::${hash}`;
    await this.save(newKey, JSON.stringify(data), 3600);
  };

  getUserExist = async (key: string) => {
    const hash = this.getHash(key);
    const newKey = `api::usertweet::${hash}`;
    const result = await this.get(newKey);
    if (result) {
      return JSON.parse(result);
    } else {
      return undefined;
    }
  };
}
