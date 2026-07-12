import { ImportModel, ImportStatus } from "../../models/Import.js";

import { aiService } from "../ai/ai.service.js";
import { batchService } from "../csv/batch.service.js";
import { csvReaderService } from "../csv/csv-reader.service.js";
import { leadService } from "../lead/lead.service.js";
import { logger } from "../../config/logger.js";

class ImportProcessorService {
  async process(importId: string): Promise<void> {
    const importRecord = await ImportModel.findById(importId);

    if (!importRecord) {
      throw new Error("Import not found.");
    }

    try {
      // Mark import as processing
      importRecord.status = ImportStatus.PROCESSING;
      importRecord.progress = 0;
      importRecord.processedRows = 0;
      importRecord.skippedRows = 0;

      await importRecord.save();

      // Read complete CSV
      const rows = await csvReaderService.readAll(importRecord.filePath);

      // Nothing to process
      if (rows.length === 0) {
        importRecord.status = ImportStatus.COMPLETED;
        importRecord.progress = 100;

        await importRecord.save();
        return;
      }

      // Create AI batches
      const batches = batchService.createBatches(rows);

      logger.info(
        {
          importId: importRecord.id,
          totalRows: rows.length,
          totalBatches: batches.length,
        },
        "Starting import processing.",
      );

      let processedRows = 0;

      for (const batch of batches) {
        // Normalize using AI
        const normalizedLeads = await aiService.normalize(batch);

        // Save normalized leads
        await leadService.createMany(importRecord.id, normalizedLeads);

        // Update progress
        processedRows += batch.length;

        importRecord.processedRows = processedRows;
        importRecord.progress = Math.round((processedRows / rows.length) * 100);

        await importRecord.save();
      }

      // Mark completed
      importRecord.status = ImportStatus.COMPLETED;
      importRecord.processedRows = rows.length;
      importRecord.progress = 100;

      await importRecord.save();

      logger.info(
        {
          importId: importRecord.id,
          processedRows: rows.length,
        },
        "Import completed successfully.",
      );
    } catch (error) {
      logger.error(
        {
          importId: importRecord.id,
          error,
        },
        "Import processing failed.",
      );

      importRecord.status = ImportStatus.FAILED;

      await importRecord.save();

      throw error;
    }
  }
}

export const importProcessorService = new ImportProcessorService();
