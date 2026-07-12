import Redis from "ioredis";

import { env } from "./env.js";
import { logger } from "./logger.js";

export const redis =
  env.NODE_ENV === "production" && env.REDIS_URL
    ? new Redis(env.REDIS_URL, {
        maxRetriesPerRequest: null,
      })
    : new Redis({
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        maxRetriesPerRequest: null,
      });

redis.on("connect", () => {
  logger.info(
    {
      mode:
        env.NODE_ENV === "production" && env.REDIS_URL
          ? "cloud"
          : "local",
    },
    "Redis connected",
  );
});

redis.on("error", (error: Error) => {
  logger.error(
    {
      error,
    },
    "Redis connection error",
  );
});