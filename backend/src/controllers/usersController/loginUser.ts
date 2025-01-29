import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../../schemas/user";
import { prisma } from "../../prisma";
import bcrypt from "bcrypt";
import getUserEmail from "../../helper/db/getUserEmail";
import { compareWithHash } from "../../helper/hashPassword";
import { generateToken } from "../../helper/jwt";

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const parsedData = loginSchema.parse(req.body);
    const { email, password } = parsedData;

    const user = await getUserEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = compareWithHash(password, user.password);
    if (!validPassword) return res.status(403);

    const token = generateToken(user);
  } catch (error) {
    return next(error);
  }
};

export default loginUser;
