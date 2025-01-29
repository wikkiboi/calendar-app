import { isTokenBlacklisted } from "../helper/blacklist";
import { verifyToken } from "../helper/auth/generateToken";

export const authMiddleware = async (
  token?: string
): Promise<{ userId: string } | null> => {
  if (!token) {
    throw new Error("Authorization token is required.");
  }

  // const isBlacklisted = await isTokenBlacklisted(token);
  // if (isBlacklisted) {
  //   throw new Error("Invalid token.");
  // }

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    console.error("Auth Middleware Error: ", error);
    return null;
  }
};
