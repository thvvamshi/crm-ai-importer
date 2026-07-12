"use client";

import { X } from "lucide-react";

import Dropzone from "./Dropzone";
import FilePreview from "./FilePreview";

interface UploadModalProps {
  open: boolean;
  selectedFile: File |null;
  previewRows: Record<string, string>[];
  isProcessing: boolean;
  status: string;
  progress: number;
  onClose: () => void;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  onUpload: () => void;
}

export default function UploadModal({
  open,
  selectedFile,
  previewRows,
  isProcessing,
  status,
  progress,
  onClose,
  onFileSelect,
  onRemove,
  onUpload,
}: UploadModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Import Leads via CSV
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload a CSV file to bulk import leads into your system.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-lg font-semibold text-slate-900">
                Import in Progress
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Please keep this window open while your CSV is being processed.
              </p>

              <div className="mt-8 w-full rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">Status</span>

                  <span className="font-semibold text-orange-600">
                    {status || "UPLOADING"}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">Progress</span>

                  <span className="font-semibold text-slate-900">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
          ) : selectedFile ? (
            <FilePreview
              file={selectedFile}
              rows={previewRows}
              onRemove={onRemove}
            />
          ) : (
            <Dropzone onFileSelect={onFileSelect} />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-slate-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 rounded-xl border border-slate-300 bg-white py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onUpload}
            disabled={!selectedFile || isProcessing}
            className={`flex-1 rounded-xl py-3 text-base font-semibold text-white transition ${
              !selectedFile || isProcessing
                ? "cursor-not-allowed bg-orange-300"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isProcessing ? `Importing... ${progress}%` : "Import Leads"}
          </button>
        </div>
      </div>
    </div>
  );
}