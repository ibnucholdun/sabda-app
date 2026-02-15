import { CheckCircle2, Circle, Lock, X } from "lucide-react";
import React from "react";

const DetailHistoryPerDay = ({
  setSelectedDayDetail,
  selectedDayDetail,
}: {
  setSelectedDayDetail: (value: any) => void;
  selectedDayDetail: any;
}) => {
  return (
    <div className="fixed inset-0 z-120 flex items-end justify-center px-4 pb-6">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={() => setSelectedDayDetail(null)}
      ></div>
      <div className="relative flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-[3rem] bg-white text-left shadow-2xl">
        <div className="mx-auto my-4 h-1.5 w-12 flex-none rounded-full bg-slate-200"></div>
        <div className="flex items-start justify-between px-8 pb-4">
          <div>
            <p className="mb-1 text-[10px] font-black text-emerald-600 uppercase">
              Arsip Riwayat
            </p>
            <h5 className="text-2xl leading-tight font-black text-slate-900">
              {selectedDayDetail.day}{" "}
              {new Intl.DateTimeFormat("id-ID", {
                month: "long",
                year: "numeric",
              }).format(
                new Date(selectedDayDetail.year, selectedDayDetail.month),
              )}
            </h5>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${selectedDayDetail.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-black text-emerald-700">
                {selectedDayDetail.percentage}%
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedDayDetail(null)}
            className="rounded-2xl bg-slate-50 p-3 text-slate-400 transition-all"
          >
            <X size={20} />
          </button>
        </div>
        <div className="scrollbar-hide flex-1 space-y-6 overflow-y-auto px-8 pb-24">
          {selectedDayDetail.reflection && (
            <div className="rounded-4xl border border-indigo-100 bg-indigo-50/70 p-5">
              <p className="mb-3 text-[10px] font-black text-indigo-600 uppercase">
                Refleksi Diri
              </p>
              <p className="text-sm font-medium text-slate-700 italic">
                {selectedDayDetail.reflection}
              </p>
            </div>
          )}

          {selectedDayDetail.aiResponse && (
            <div className="rounded-4xl border border-l-4 border-slate-100 border-l-rose-400 bg-white p-5 text-left shadow-sm">
              <p className="mb-2 text-[10px] font-black tracking-widest text-rose-500 uppercase">
                Hikmah SabdaAI
              </p>
              <p className="text-sm font-medium text-slate-700 italic">
                {selectedDayDetail.aiResponse}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <p className="mb-1 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
              Amalan Terdaftar
            </p>
            {selectedDayDetail.activities.map((act: any, i: number) => (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-4xl border p-5 ${act.completed ? "border-emerald-100 bg-emerald-50/30" : "border-slate-100 bg-slate-50 opacity-60"}`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${act.completed ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-400"}`}
                >
                  {act.completed ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Circle size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-bold ${act.completed ? "text-slate-800" : "text-slate-400 line-through"}`}
                  >
                    {act.label}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <p className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                      {act.category === "Wajib" && <Lock size={8} />}{" "}
                      {act.category}
                    </p>
                    {act.note && (
                      <span className="text-[9px] font-medium text-amber-600 italic">
                        • {act.note}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6">
          <button
            onClick={() => setSelectedDayDetail(null)}
            className="w-full rounded-2xl bg-emerald-800 py-5 text-xs font-black text-white uppercase shadow-xl transition-all active:scale-95"
          >
            Tutup Riwayat
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailHistoryPerDay;
