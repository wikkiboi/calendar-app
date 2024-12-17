import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "abc123";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });
};

export const verifyToken = (token: string): { userId: string } => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
};
