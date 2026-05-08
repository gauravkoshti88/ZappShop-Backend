import redis from "redis"

const redisClient = redis.createClient();

redisClient.on("error", (err) => console.error("Redis Error", err));

await redisClient.connect(); 

export default redisClient;