import { Queue } from "bullmq";
import { redis } from "../config/redis.js";

export const importQueue = new Queue("crm-import", {
    connection: redis
});