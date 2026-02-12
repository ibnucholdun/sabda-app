"use client";

import { Book, Grid } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React from "react";

const TabNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.has("juz") ? "juz" : "surah";

  return (
    <div className="mx-1 flex rounded-2xl bg-slate-100 p-1.5 shadow-inner">
      <button
        onClick={() => router.push(pathname)}
        className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-[10px] font-black tracking-widest uppercase transition-all ${
          activeTab === "surah"
            ? "bg-white text-emerald-800 shadow-sm"
            : "text-slate-400"
        }`}
      >
        <Book size={14} /> Surah
      </button>
      <button
        onClick={() => router.push(`${pathname}?juz`)}
        className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-[10px] font-black tracking-widest uppercase transition-all ${
          activeTab === "juz"
            ? "bg-white text-emerald-800 shadow-sm"
            : "text-slate-400"
        }`}
      >
        <Grid size={14} /> Juz
      </button>
    </div>
  );
};

export default TabNavigation;
