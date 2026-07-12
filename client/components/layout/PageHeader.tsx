interface PageHeaderProps {
  onUploadClick: () => void;
}

export default function PageHeader({ onUploadClick }: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Lead Sources
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Connect, manage, and control all your lead channels from one
          dashboard. Upload a CSV file and let AI intelligently extract CRM lead
          information.
        </p>
      </div>

      <button
        onClick={onUploadClick}
        className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
      >
        Upload CSV
      </button>
    </div>
  );
}
