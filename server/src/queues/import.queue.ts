import { Queue } from "bullmq";

import { env } from "../config/env.js";

export const importQueue = new Queue("crm-import", {
  connection:
    env.NODE_ENV === "production" && env.REDIS_URL
      ? {
          url: env.REDIS_URL,
        }
      : {
          host: env.REDIS_HOST,
          port: env.REDIS_PORT,
        },

  prefix: env.REDIS_PREFIX,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: "exponential",
      delay: 30000,
    },

    removeOnComplete: 100,
    removeOnFail: 100,
  },
});