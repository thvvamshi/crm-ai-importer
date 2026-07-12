import { Queue } from "bullmq";

import { redis } from "../config/redis.js";
import { env } from "../config/env.js";

export const importQueue = new Queue("crm-import", {
  connection: redis,
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
