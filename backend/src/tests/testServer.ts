import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "../routers/router";
import redisClient from "../helper/redis";

export const createTestServer = () => {
  const app = express();
  app.use(express.json());

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: ({ req }) => ({ user: null, req, redis: redisClient }),
    })
  );
  return app;
};
