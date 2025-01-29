import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user: User) => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET missing in environment");
  const tokenObject = { user: { username: user.name } };
  const userJSON = JSON.stringify(tokenObject);
  const token = jwt.sign(userJSON, JWT_SECRET);
  return token;
};

export default generateToken;
