"use client";

import { Book, ChevronLeft, Languages, Layout } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { startTransition } from "react";

const AlQuranReaderToolbar = ({
  title,
  toggleElement,
  showTranslation,
  viewMode,
  setViewMode,
}: {
  title: string;
  toggleElement: () => void;
  showTranslation: boolean;
  viewMode: "list" | "mushaf";
  setViewMode: (mode: "list" | "mushaf") => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackToList = () => {
    router.push("/al-quran");
  };

  const toggleViewMode = () => {
    const nextMode = viewMode === "list" ? "mushaf" : "list";
    setViewMode(nextMode);
  };

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between rounded-2xl border border-white/20 bg-white/70 p-2 shadow-sm backdrop-blur-xl">
      <div className="scrollbar-hide flex items-center gap-1.5 overflow-x-auto">
        <button
          onClick={handleBackToList}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-emerald-50 bg-white px-3 py-1.5 text-[11px] font-bold text-emerald-800 shadow-sm active:scale-95"
        >
          <ChevronLeft size={14} /> Kembali
        </button>

        <div className="mx-1 h-6 w-px bg-slate-100"></div>

        <button
          onClick={toggleViewMode}
          className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[10px] font-bold active:scale-95 ${
            viewMode === "mushaf"
              ? "border-amber-200 bg-amber-100 text-amber-900"
              : "border-slate-100 bg-white text-slate-500"
          }`}
        >
          {viewMode === "mushaf" ? <Layout size={14} /> : <Book size={14} />}
          <span className="xs:inline hidden">
            {viewMode === "mushaf" ? "Mushaf" : "List"}
          </span>
        </button>

        {viewMode === "list" && (
          <button
            onClick={toggleElement}
            className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[10px] font-bold active:scale-95 ${
              showTranslation
                ? "border-emerald-500 bg-emerald-600 text-white shadow-md"
                : "border-slate-100 bg-white text-slate-500"
            }`}
          >
            <Languages size={14} />
            <span className="xs:inline hidden">
              {showTranslation ? "Terjemahan" : "Arab"}
            </span>
          </button>
        )}
      </div>

      <div className="min-w-20 px-2 text-right">
        <p className="text-[9px] leading-none font-black tracking-widest text-slate-400 uppercase">
          Membaca
        </p>
        <p className="max-w-25 truncate text-xs font-bold text-slate-800">
          {title}
        </p>
      </div>
    </div>
  );
};

export default AlQuranReaderToolbar;
