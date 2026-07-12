import fs from "node:fs";
import csv from "csv-parser";

export type CsvRow = Record<string, string>;

class CsvReaderService {
  async readAll(filePath: string): Promise<CsvRow[]> {
    return new Promise((resolve, reject) => {
      const rows: CsvRow[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row: CsvRow) => {
          rows.push(row);
        })
        .on("end", () => {
          resolve(rows);
        })
        .on("error", reject);
    });
  }
}

export const csvReaderService = new CsvReaderService();
