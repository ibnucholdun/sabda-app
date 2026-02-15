import { ChevronDown } from "lucide-react";
import React from "react";

const TitleSelector = ({
  tasbihTitle,
  setIsDzikirModalOpen,
}: {
  tasbihTitle: string;
  setIsDzikirModalOpen: (value: boolean) => void;
}) => {
  return (
    <div className="space-y-2 text-center">
      <button
        onClick={() => setIsDzikirModalOpen(true)}
        className="group inline-flex items-center gap-2 rounded-full border border-emerald-50 bg-white px-6 py-2 shadow-sm transition-all active:scale-95"
      >
        <span className="text-sm font-black tracking-tight text-emerald-800 uppercase">
          {tasbihTitle}
        </span>
        <ChevronDown
          size={14}
          className="text-emerald-400 transition-transform group-hover:translate-y-0.5"
        />
      </button>
      <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
        Klik Judul untuk Ganti Dzikir
      </p>
    </div>
  );
};

export default TitleSelector;
