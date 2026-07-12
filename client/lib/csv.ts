import Papa from "papaparse";

export async function parseCSV(file: File) {
  return new Promise<Record<string, string>[]>((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete(results) {
        resolve(results.data as Record<string, string>[]);
      },

      error(error) {
        reject(error);
      },
    });
  });
}