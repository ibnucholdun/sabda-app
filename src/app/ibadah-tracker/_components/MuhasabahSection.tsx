import { PenLine, RefreshCw, Sparkles } from "lucide-react";
import React from "react";
import type { DailyIbadahRecord, HistoricalData } from "~/types/type";

const MuhasabahSection = ({
  todayRecord,
  todayKey,
  setHistory,
  handleGetAIReflectionRespon,
  isGeneratingAI,
}: {
  todayRecord: DailyIbadahRecord; // Changed from HistoricalData
  todayKey: string;
  setHistory: React.Dispatch<React.SetStateAction<HistoricalData>>;
  handleGetAIReflectionRespon: () => void;
  isGeneratingAI: boolean;
}) => {
  return (
    <div className="space-y-4 rounded-[2.5rem] border border-indigo-100 bg-indigo-50/50 p-6">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <PenLine size={18} />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-black text-indigo-900">Muhasabah</h4>
            <p className="mt-1 text-[10px] leading-none font-bold tracking-widest text-indigo-400 uppercase">
              Refleksi Harian
            </p>
          </div>
        </div>
        <button
          onClick={handleGetAIReflectionRespon}
          disabled={isGeneratingAI}
          className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-[10px] font-bold tracking-wider text-indigo-700 uppercase shadow-sm active:scale-95"
        >
          {isGeneratingAI ? (
            <RefreshCw size={12} className="animate-spin" />
          ) : (
            <Sparkles size={12} />
          )}
          Dapatkan Hikmah
        </button>
      </div>
      <textarea
        placeholder="Tulis refleksi jiwamu hari ini..."
        value={todayRecord.reflection ?? ""}
        onChange={(e) =>
          setHistory((prev) => ({
            ...prev,
            [todayKey]: {
              ...(prev[todayKey] ?? { activities: {} }),
              reflection: e.target.value,
            },
          }))
        }
        className="min-h-35 w-full resize-none rounded-4xl border border-indigo-100 bg-white p-5 text-sm font-medium focus:ring-2 focus:ring-indigo-200"
      />
      {todayRecord.aiResponse && (
        <div className="animate-in slide-in-from-top-2 rounded-4xl border border-l-4 border-slate-100 border-l-rose-400 bg-white p-5 text-left shadow-sm">
          <p className="mb-2 text-[10px] font-black tracking-widest text-rose-500 uppercase">
            Hikmah SabdaAI
          </p>
          <p className="text-sm font-medium text-slate-700 italic">
            {todayRecord.aiResponse}
          </p>
        </div>
      )}
    </div>
  );
};

export default MuhasabahSection;
