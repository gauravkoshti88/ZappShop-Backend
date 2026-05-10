import redis from "redis"

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
  if (process.env.NODE_ENV === "development") {
    console.error("Redis Error:", err);
  }
});

await redisClient.connect(); 

export default redisClient;