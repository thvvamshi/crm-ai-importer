import { ImportModel, ImportStatus } from "../../models/Import.js";
import { importQueue } from "../../queues/import.queue.js";

class ProcessImportService {
  async execute(importId: string) {
    const importRecord = await ImportModel.findById(importId);

    if (!importRecord) {
      throw new Error("Import not found.");
    }

    if (importRecord.status !== ImportStatus.PREVIEW_READY) {
      throw new Error(
        `Import cannot be processed from status '${importRecord.status}'.`
      );
    }

    importRecord.status = ImportStatus.QUEUED;
    await importRecord.save();

    await importQueue.add("process-import", {
      importId,
    });

    return {
      importId: importRecord.id,
      status: importRecord.status,
    };
  }
}

export const processImportService = new ProcessImportService();