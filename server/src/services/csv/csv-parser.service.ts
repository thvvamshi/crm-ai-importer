import fs from "node:fs";
import csv from "csv-parser";


export interface ParsedCsvResult {
  columns: string[];
  preview: Record<string, string>[];
  totalRows: number;
}

export type CsvRow = Record<string, string>;

const PREVIEW_ROWS = 10;

export class CsvParserService {
  async parse(filePath: string): Promise<ParsedCsvResult> {
    return new Promise((resolve, reject) => {
      const preview: CsvRow[] = [];
      let columns: string[] = [];
      let totalRows = 0;

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("headers", (headers: string[]) => {
          columns = headers;
        })
        .on("data", (row: CsvRow) => {
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

  async parseAll(filePath: string): Promise<CsvRow[]> {
    return new Promise((resolve, reject) => {
      const rows: CsvRow[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row: CsvRow) => {
          rows.push(row);
        })
        .on("end", () => resolve(rows))
        .on("error", reject);
    });
  }
}

export const csvParserService = new CsvParserService();