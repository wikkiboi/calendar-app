import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../../schemas/user";
import getUserEmail from "../../helper/db/getUserEmail";
import { compareWithHash } from "../../helper/hashPassword";
import { generateToken } from "../../helper/auth";
import getUser from "../../helper/db/getUser";

export default async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const parsedData = loginSchema.parse(req.body);
    const { usernameOrEmail, password } = parsedData;

    const isEmail = /\S+@\S+\.\S+/.test(usernameOrEmail);

    const user = await (isEmail
      ? getUserEmail(usernameOrEmail)
      : getUser(usernameOrEmail));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = compareWithHash(password, user.password);
    if (!validPassword) return res.status(403);

    const token = generateToken(user);
  } catch (error) {
    return next(error);
  }
}
