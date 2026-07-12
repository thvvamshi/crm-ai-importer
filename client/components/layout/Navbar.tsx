import { Bell, ChevronDown, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Dashboard
        </p>

        <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
          Lead Sources
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 lg:flex">
          <Search size={16} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Notification */}
        <button className="rounded-lg p-2 transition hover:bg-slate-100">
          <Bell size={20} className="text-slate-600" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
            VK
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-medium text-slate-900">Vamshi</p>

            <p className="text-xs text-slate-500">Admin</p>
          </div>

          <ChevronDown size={16} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
}
