import path from "node:path";

import { ImportModel, ImportStatus } from "../../models/Import.js";
import { csvParserService } from "../csv/csv-parser.service.js";

interface CreateImportInput {
  originalFilename: string;
  storedFilename: string;
  fileSize: number;
  mimeType: string;
}

class ImportService {
  async createImport({
    originalFilename,
    storedFilename,
    fileSize,
    mimeType,
  }: CreateImportInput) {
    const filePath = path.join("uploads", storedFilename);

    // Parse CSV
    const parsedCsv = await csvParserService.parse(filePath);

    // Save Import Metadata
    const importRecord = await ImportModel.create({
      originalFilename,
      storedFilename,
      filePath,
      fileSize,
      mimeType,
      totalRows: parsedCsv.totalRows,
      processedRows: 0,
      skippedRows: 0,
      progress: 0,
      status: ImportStatus.PREVIEW_READY,
    });

    return {
      importId: importRecord.id,
      status: importRecord.status,
      metadata: {
        columns: parsedCsv.columns,
        totalRows: parsedCsv.totalRows,
      },
      previewRows: parsedCsv.preview,
    };
  }
}

export const importService = new ImportService();
