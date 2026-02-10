import React from "react";
import { Moon } from "lucide-react";

const HolydayBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-emerald-500/20 blur-[60px]"></div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3">
            <Moon className="text-emerald-400" size={24} fill="currentColor" />
          </div>
          <div>
            <h4 className="text-xl font-bold tracking-tight text-white">
              Ramadhan 1447 H
            </h4>
            <p className="mt-0.5 text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
              Menunggu Ikhbar PBNU
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-2xl leading-none font-black text-white">
            12
          </span>
          <span className="text-[10px] font-bold tracking-tighter text-slate-400 uppercase">
            Hari Lagi
          </span>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div className="h-full w-[70%] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
      </div>
    </div>
  );
};

export default HolydayBanner;
