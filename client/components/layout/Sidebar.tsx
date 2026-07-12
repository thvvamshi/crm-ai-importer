import {
  LayoutDashboard,
  Rocket,
  Database,
  Users,
  Megaphone,
  MessageSquare,
  Phone,
  Globe,
} from "lucide-react";

const mainMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Generate Leads",
    icon: Rocket,
  },
  {
    name: "Manage Leads",
    icon: Database,
    active: true,
  },
];

const controlMenu = [
  {
    name: "Team Members",
    icon: Users,
  },
  {
    name: "Lead Sources",
    icon: Megaphone,
  },
  {
    name: "WhatsApp",
    icon: MessageSquare,
  },
  {
    name: "Tele Calling",
    icon: Phone,
  },
  {
    name: "API Center",
    icon: Globe,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-lg font-bold text-white">
          G
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-900">GrowEasy</h1>

          <p className="text-xs text-slate-500">CRM Platform</p>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* MAIN */}
        <div className="mb-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main
          </p>

          <nav className="space-y-1">
            {mainMenu.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    item.active
                      ? "border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={18} />

                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* CONTROL CENTER */}
        <div>
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Control Center
          </p>

          <nav className="space-y-1">
            {controlMenu.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  <Icon size={18} />

                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
