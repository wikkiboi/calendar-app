import { router } from "../trpc";
import { userRouter } from "./userRouter";
import { eventRouter } from "./eventRouter";

export const appRouter = router({
  user: userRouter,
  event: eventRouter,
});

export type AppRouter = typeof appRouter;
