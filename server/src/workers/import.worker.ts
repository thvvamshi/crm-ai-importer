import { Worker } from "bullmq";

import { logger } from "../config/logger.js";
import { redis } from "../config/redis.js";
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
    connection: redis,
  },
);

worker.on("ready", () => {
  logger.info("Import worker is ready.");
});

worker.on("active", (job) => {
  logger.info(
    {
      jobId: job.id,
    },
    "Import job started.",
  );
});

worker.on("completed", (job) => {
  logger.info(
    {
      jobId: job.id,
    },
    "Import job completed.",
  );
});

worker.on("failed", (job, error) => {
  logger.error(
    {
      jobId: job?.id,
      error,
    },
    "Import job failed.",
  );
});

worker.on("error", (error) => {
  logger.error(
    {
      error,
    },
    "Worker error.",
  );
});
