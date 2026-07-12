import { Database } from "lucide-react";

export default function EmptyLeads() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">Active Leads</h2>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          0 Leads
        </span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white py-16">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Database size={26} className="text-slate-500" />
          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            No imported leads
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Upload a CSV file to preview and import CRM leads. Imported records
            will appear here.
          </p>
        </div>
      </div>
    </section>
  );
}
