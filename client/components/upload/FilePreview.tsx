"use client";

import { FileSpreadsheet, X } from "lucide-react";

interface Props {
  file: File;
  rows: Record<string, string>[];
  onRemove: () => void;
}

export default function FilePreview({ file, rows, onRemove }: Props) {
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="space-y-5">
      {/* File Card */}

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
            <FileSpreadsheet size={24} className="text-emerald-600" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">{file.name}</h3>

            <p className="text-sm text-slate-500">
              {(file.size / 1024).toFixed(2)} KB • {rows.length} rows •{" "}
              {headers.length} columns
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove file"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Preview */}

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b px-5 py-4">
          <h3 className="font-semibold text-slate-900">CSV Preview</h3>

          <p className="mt-1 text-sm text-slate-500">
            Showing the first {Math.min(rows.length, 8)} records.
          </p>
        </div>

        {rows.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            No preview available.
          </div>
        ) : (
          <div className="max-h-[320px] overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-slate-50">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="whitespace-nowrap border-b px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.slice(0, 8).map((row, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none even:bg-slate-50/50"
                  >
                    {headers.map((header) => (
                      <td
                        key={header}
                        className="whitespace-nowrap px-4 py-3 text-slate-700"
                      >
                        {row[header] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
