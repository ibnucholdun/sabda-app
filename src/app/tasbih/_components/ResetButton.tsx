import { RotateCcw } from "lucide-react";
import React from "react";

const ResetButton = ({
  handleTasbihReset,
}: {
  handleTasbihReset: () => void;
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleTasbihReset}
        className="group flex items-center gap-2 rounded-3xl border border-slate-100 bg-white px-8 py-4 shadow-sm transition-all active:scale-95"
      >
        <RotateCcw
          size={18}
          className="text-slate-300 transition-all group-hover:text-emerald-600 group-active:rotate-[-120deg]"
        />
        <span className="text-xs font-black tracking-widest text-slate-400 uppercase group-hover:text-emerald-800">
          Reset Angka
        </span>
      </button>
    </div>
  );
};

export default ResetButton;
