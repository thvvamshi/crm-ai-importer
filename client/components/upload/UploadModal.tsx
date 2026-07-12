"use client";

import { X } from "lucide-react";
import Dropzone from "./Dropzone";

interface UploadModalProps {
  open: boolean;
  selectedFile: File | null;
  onClose: () => void;
  onFileSelect: (file: File) => void;
}

export default function UploadModal({
  open,
  selectedFile,
  onClose,
  onFileSelect,
}: UploadModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      {" "}
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {" "}
        {/* Header */}
        <div className="flex items-start justify-between border-b px-6 py-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Import Leads via CSV
            </h2>

            <p className="mt-1 text-[15px] text-slate-500">
              Upload a CSV file to bulk import leads into your system.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-slate-100"
          >
            <X />
          </button>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          <Dropzone onFileSelect={onFileSelect} />
        </div>
        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-slate-200 bg-white px-8 py-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-300 bg-white py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!selectedFile}
            className={`flex-1 rounded-xl py-3 text-base font-semibold text-white transition ${
              selectedFile
                ? "bg-orange-500 hover:bg-orange-600"
                : "cursor-not-allowed bg-orange-300"
            }`}
          >
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
}
