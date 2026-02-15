import { CheckCircle, Save, X } from "lucide-react";
import React from "react";

const SettingTasbih = ({
  setIsDzikirModalOpen,
  tasbihTitle,
  setTasbihTitle,
  tasbihLimit,
  setTasbihLimit,
  customLimit,
  setCustomLimit,
  customDzikir,
  setCustomDzikir,
  saveCustomLimit,
  saveCustomDzikir,
  dzikirList,
}: {
  isDzikirModalOpen: boolean;
  setIsDzikirModalOpen: (open: boolean) => void;
  tasbihTitle: string;
  setTasbihTitle: (title: string) => void;
  tasbihLimit: number;
  setTasbihLimit: (limit: number) => void;
  customLimit: string;
  setCustomLimit: (limit: string) => void;
  customDzikir: string;
  setCustomDzikir: (dzikir: string) => void;
  saveCustomLimit: () => void;
  saveCustomDzikir: () => void;
  dzikirList: string[];
}) => {
  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setIsDzikirModalOpen(false)}
      ></div>
      <div className="animate-in slide-in-from-bottom-full relative flex max-h-[90vh] w-full max-w-md flex-col rounded-t-[3rem] bg-white p-5 shadow-2xl duration-500">
        <div className="mx-auto mb-8 h-1.5 w-12 flex-none rounded-full bg-slate-100"></div>

        <div className="mb-6 flex flex-none items-center justify-between px-1">
          <div>
            <h3 className="text-xl leading-none font-black text-slate-900">
              Pengaturan Tasbih
            </h3>
            <p className="mt-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Ganti dzikir & target angka
            </p>
          </div>
          <button
            onClick={() => setIsDzikirModalOpen(false)}
            className="rounded-xl bg-slate-50 p-2 text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="scrollbar-hide flex-1 space-y-6 overflow-y-auto pr-1">
          {/* Target Limit Section */}
          <div className="space-y-3">
            <p className="px-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
              Pilih Target Angka
            </p>
            <div className="grid grid-cols-4 gap-2 px-1">
              {[33, 99, 100, 1000].map((lim) => (
                <button
                  key={lim}
                  onClick={() => setTasbihLimit(lim)}
                  className={`rounded-2xl border py-3 text-sm font-black transition-all ${
                    tasbihLimit === lim
                      ? "border-emerald-500 bg-emerald-600 text-white shadow-lg"
                      : "border-slate-100 bg-slate-50 text-slate-600"
                  }`}
                >
                  {lim}
                </button>
              ))}
            </div>
            <div className="mt-2 flex gap-2 px-1">
              <input
                type="number"
                placeholder="Target Kustom..."
                value={customLimit}
                onChange={(e) => setCustomLimit(e.target.value)}
                className="flex-1 rounded-2xl border-none bg-slate-50 px-5 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                onClick={saveCustomLimit}
                className="rounded-2xl bg-slate-800 px-5 text-xs font-bold text-white uppercase"
              >
                Set
              </button>
            </div>
          </div>

          {/* Dzikir List Section */}
          <div className="space-y-3">
            <p className="px-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
              Daftar Kalimat Dzikir
            </p>
            <div className="grid grid-cols-1 gap-2">
              {dzikirList.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setTasbihTitle(d);
                    setIsDzikirModalOpen(false);
                  }}
                  className={`flex items-center justify-between rounded-[1.75rem] border p-5 text-left transition-all ${
                    tasbihTitle === d
                      ? "border-emerald-200 bg-emerald-50 shadow-sm"
                      : "border-slate-100 bg-slate-50/50"
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${tasbihTitle === d ? "text-emerald-900" : "text-slate-700"}`}
                  >
                    {d}
                  </span>
                  {tasbihTitle === d && (
                    <CheckCircle size={18} className="text-emerald-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex-none border-t border-slate-50 pt-4">
          <p className="mb-3 px-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
            Tambah Dzikir Baru
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Contoh: Sholawat Nabi..."
              value={customDzikir}
              onChange={(e) => setCustomDzikir(e.target.value)}
              className="flex-1 rounded-2xl border-none bg-slate-50 px-5 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              onClick={saveCustomDzikir}
              className="rounded-2xl bg-emerald-800 p-3.5 text-white shadow-lg active:scale-90"
            >
              <Save size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingTasbih;
