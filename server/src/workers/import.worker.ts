import { Worker } from "bullmq";
import { redis } from "../config/redis.js";

new Worker(
    "crm-import",

    async job => {

        console.log(job.data);

    },

    {
        connection: redis
    }

);