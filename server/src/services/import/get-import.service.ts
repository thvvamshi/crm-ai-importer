import { ImportModel } from "../../models/Import.js";

class GetImportService {
  async execute(importId: string) {
    const importRecord = await ImportModel.findById(importId);

    if (!importRecord) {
      throw new Error("Import not found.");
    }

    return {
      id: importRecord.id,
      originalFilename: importRecord.originalFilename,
      storedFilename: importRecord.storedFilename,
      status: importRecord.status,
      progress: importRecord.progress,
      totalRows: importRecord.totalRows,
      processedRows: importRecord.processedRows,
      skippedRows: importRecord.skippedRows,
      createdAt: importRecord.createdAt,
      updatedAt: importRecord.updatedAt,
    };
  }
}

export const getImportService = new GetImportService();