"use client";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  state: string;
  country: string;
  leadOwner: string;
  crmStatus: string | null;
  crmNote: string | null;
}

interface LeadsTableProps {
  leads: Lead[];
  onImportMore: () => void;
  onPageChange: (page: number) => void;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function StatusBadge({ status }: { status: string | null }) {
  if (!status) {
    return (
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
        Pending
      </span>
    );
  }

  const styles: Record<string, string> = {
    SUCCESS: "bg-emerald-100 text-emerald-700",
    FAILED: "bg-red-100 text-red-700",
    PROCESSING: "bg-amber-100 text-amber-700",
    QUEUED: "bg-sky-100 text-sky-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function LeadsTable({
  leads,
  onImportMore,
  pagination,
  onPageChange,
}: LeadsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Imported Leads
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {pagination.total} lead{pagination.total !== 1 ? "s" : ""} imported
          </p>
        </div>

        <button
          onClick={onImportMore}
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Import More
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Company
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Owner
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                City
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                CRM Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                CRM Note
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {leads.map((lead) => (
              <tr key={lead.id} className="transition hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                  {lead.name}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {lead.email}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {lead.phone}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {lead.company}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {lead.leadOwner}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {lead.city}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <StatusBadge status={lead.crmStatus} />
                </td>

                <td className="max-w-xs px-6 py-4 text-slate-600">
                  {lead.crmNote ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
        <p className="text-sm font-medium text-slate-700">
  Showing {(pagination.page - 1) * pagination.limit + 1}–
  {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
  {pagination.total} leads
</p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="rounded-lg border border-slate-700 text-black px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`h-9 w-9 rounded-lg text-sm font-medium ${
                  page === pagination.page
                    ? "bg-orange-500 text-white"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="rounded-lg border border-slate-700 px-3 text-black py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
