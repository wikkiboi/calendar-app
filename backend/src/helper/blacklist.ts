import redisClient from "./redis";

export const blacklistToken = async (
  token: string,
  expiresIn: number
): Promise<void> => {
  await redisClient.set(token, "blacklisted", { EX: expiresIn });
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  const result = await redisClient.get(token);
  return result === "blacklisted";
};
