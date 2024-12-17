import { Request } from "express";
import redisClient from "../helper/redis";

export type Context = {
  req: Request;
  user: { userId: string } | Promise<{ userId: string } | null> | null;
  redis: typeof redisClient;
};
