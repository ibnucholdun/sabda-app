import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { tabs } from "../datas/data";

const BottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Helper to check if tab is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-50 flex justify-center px-4 pb-6">
      <nav className="mb-safe pointer-events-auto flex w-full max-w-md items-center justify-between rounded-[2.5rem] border border-white bg-white/90 px-2 py-2 shadow-[0_15px_40px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.path)}
              className={`relative flex h-12 flex-1 flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
                active
                  ? "text-emerald-700"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div
                className={`transition-transform duration-300 ${active ? "-translate-y-1" : ""}`}
              >
                <Icon size={22} />
              </div>

              <span
                className={`absolute bottom-1 text-[8px] font-black tracking-widest uppercase transition-all duration-300 ${
                  active
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-1 scale-75 opacity-0"
                }`}
              >
                {tab.label}
              </span>

              {active && (
                <div className="absolute -top-1 h-1 w-1 rounded-full bg-emerald-700 shadow-[0_0_8px_#059669]"></div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
