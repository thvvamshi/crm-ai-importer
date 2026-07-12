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
