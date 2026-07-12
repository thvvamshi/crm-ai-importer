import { Worker } from "bullmq";

import { redis } from "../config/redis.js";
import { ImportModel, ImportStatus } from "../models/Import.js";
import { csvParserService } from "../services/csv/csv-parser.service.js";
import { batchService } from "../services/csv/batch.service.js";

new Worker(
  "crm-import",
  async (job) => {
    const { importId } = job.data;

    const importRecord = await ImportModel.findById(importId);

    if (!importRecord) {
      throw new Error("Import not found.");
    }

    importRecord.status = ImportStatus.PROCESSING;
    await importRecord.save();

    const rows = await csvParserService.parseAll(importRecord.filePath);

    const batches = batchService.createBatches(rows);

    console.log("=================================");
    console.log(`Import : ${importRecord.id}`);
    console.log(`Rows   : ${rows.length}`);
    console.log(`Batches: ${batches.length}`);
    console.log("=================================");

    importRecord.status = ImportStatus.COMPLETED;
    importRecord.progress = 100;

    await importRecord.save();
  },
  {
    connection: redis,
  }
);