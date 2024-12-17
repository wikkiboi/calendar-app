import * as trpcExpress from "@trpc/server/adapters/express";
import express, { Express } from "express";
import { appRouter } from "./routers/router";
import helmet from "helmet";
import { authMiddleware } from "./middleware/auth";
import { Context } from "./types/context";
import redisClient from "./helper/redis";

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createContext = async ({
  req,
}: trpcExpress.CreateExpressContextOptions): Promise<Context> => {
  const token = req.headers.authorization?.split(" ")[1];
  let user = null;

  if (token) {
    try {
      user = authMiddleware(token);
    } catch (err) {
      console.error(err);
    }
  }

  return { req, user, redis: redisClient };
};

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
    // onError({ error }) {
    //   console.error("trPRC Error: ", error);
    // },
  })
);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
function next() {
  throw new Error("Function not implemented.");
}
