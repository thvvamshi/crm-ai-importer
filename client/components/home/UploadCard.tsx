import { Upload } from "lucide-react";

interface UploadCardProps {
  onUploadClick: () => void;
}

export default function UploadCard({
  onUploadClick,
}: UploadCardProps) {
  return (
    <button
      type="button"
      onClick={onUploadClick}
      className="mb-8 w-full rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-10 text-center transition hover:border-emerald-500 hover:bg-emerald-50/30"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
        <Upload size={20} className="text-emerald-600" />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        Import Leads from CSV
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
        Upload any valid CSV file to preview the data before importing.
        AI will automatically map the columns into the CRM format.
      </p>

      <span className="mt-6 inline-flex rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">
        Select CSV File
      </span>
    </button>
  );
}