import { Router } from "express";
import { loginUser, registerUser } from "../controllers/usersController";

const userRouter = Router();

userRouter.get("/", () => {});

userRouter.get("/:id", () => {});

userRouter.get("/me", () => {});

userRouter.post("/register", () => {}, registerUser);

userRouter.post("/login", () => {}, loginUser);

export default userRouter;
