"use client";

import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelect: (file: File) => void;
}

export default function Dropzone({ onFileSelect }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`rounded-2xl border-2 border-dashed p-14 text-center transition
      ${
        isDragActive ? "border-emerald-500 bg-emerald-50" : "border-slate-300"
      }`}
    >
      <input {...getInputProps()} />

      <div className="mx-auto flex h-5 w-20 items-center justify-center rounded-xl border bg-white">
        <Upload size={34} className="text-emerald-700" />
      </div>

      <h3 className="mt-1 text-4xl font-bold">Drop your CSV file here</h3>

      <p className="mt-1 text-lg text-slate-500">or click to browse files</p>

      <div className="mt-2 inline-flex rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-600">
        Supported file: .csv (max 5MB)
      </div>

      <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-500">
        Required headers: created_at, name, email, country_code,
        mobile_without_country_code, company, city, state, country, lead_owner,
        crm_status, crm_note.
      </p>
    </div>
  );
}
