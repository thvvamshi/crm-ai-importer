import fs from "node:fs";
import csv from "csv-parser";

export interface ParsedCsvResult {
  columns: string[];
  preview: Record<string, string>[];
  totalRows: number;
}

const PREVIEW_ROWS = 10;

export class CsvParserService {
  async parse(filePath: string): Promise<ParsedCsvResult> {
    return new Promise((resolve, reject) => {
      const preview: Record<string, string>[] = [];
      let columns: string[] = [];
      let totalRows = 0;

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("headers", (headers: string[]) => {
          columns = headers;
        })
        .on("data", (row: Record<string, string>) => {
          totalRows++;

          if (preview.length < PREVIEW_ROWS) {
            preview.push(row);
          }
        })
        .on("end", () => {
          resolve({
            columns,
            preview,
            totalRows,
          });
        })
        .on("error", reject);
    });
  }
}

export const csvParserService = new CsvParserService();