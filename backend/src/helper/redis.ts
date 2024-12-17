import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    await redisClient.set("testKey", "testValue");
    const value = await redisClient.get("testKey");
    console.log(`Value for testKey: ${value}`);
  } catch (err) {
    console.error("Redis test failed: ", err);
  }
})();

export default redisClient;
