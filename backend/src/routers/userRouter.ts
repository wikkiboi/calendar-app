import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { registerSchema, loginSchema } from "../schemas/user";
import jwt from "jsonwebtoken";
import { generateToken } from "../helper/jwt";
import { blacklistToken } from "../helper/blacklist";
import { Router } from "express";
import { loginUser, registerUser } from "../controllers/usersController";

const userRouter = Router();

userRouter.get("/", () => {});

userRouter.get("/:id", () => {});

userRouter.get("/me", () => {});

userRouter.post("/register", () => {}, registerUser);

userRouter.post("/login", () => {}, loginUser);
