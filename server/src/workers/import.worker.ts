import { Worker } from "bullmq";

import { env } from "../config/env.js";
import { logger } from "../config/logger.js";
import { importProcessorService } from "../services/import/import-processor.service.js";

const worker = new Worker(
  "crm-import",
  async (job) => {
    logger.info(
      {
        jobId: job.id,
        importId: job.data.importId,
      },
      "Processing import job",
    );

    await importProcessorService.process(job.data.importId);
  },
  {
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
  },
);

worker.on("ready", () => {
  logger.info("Import worker is ready.");
});

worker.on("active", (job) => {
  logger.info(
    {
      jobId: job.id,
      importId: job.data.importId,
    },
    "Import job started.",
  );
});

worker.on("completed", (job) => {
  logger.info(
    {
      jobId: job.id,
      importId: job.data.importId,
    },
    "Import job completed.",
  );
});

worker.on("failed", (job, err) => {
  logger.error(
    {
      jobId: job?.id,
      importId: job?.data?.importId,
      err,
    },
    "Import job failed.",
  );
});

worker.on("error", (err) => {
  logger.error(
    {
      err,
    },
    "Worker error.",
  );
});

export default worker;