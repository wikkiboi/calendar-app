import prisma from "../../prisma";
import { registerSchema } from "../../schemas/user";
import { NextFunction, Request, Response } from "express";
import createUser from "../../helper/db/createUser";
import generateToken from "../../helper/auth/generateToken";
import { hashPassword } from "../../helper/hashPassword";
import getUserEmail from "../../helper/db/getUserEmail";
import getUser from "../../helper/db/getUser";
export default async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const parsedData = registerSchema.parse(req.body);
    const { username, email, password } = parsedData;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    const existingUser = await getUserEmail(email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const existingUsername = await getUser(username);
    if (existingUsername) {
      throw new Error("Username is taken");
    }

    const hashedPassword = hashPassword(password);

    const user = await createUser(username, email, hashedPassword);

    const token = generateToken(user);

    return res
      .status(201)
      .json({ message: "User registered successfully!", token });
  } catch (error) {
    if (error instanceof Error) {
      // zod validation error
      return res.status(400).json({ message: error.message });
    }
    return next(error);
  }
}
