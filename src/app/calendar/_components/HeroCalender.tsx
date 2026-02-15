import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Moon,
} from "lucide-react";
import React from "react";

const HeroCalender = ({
  currentHijriInfo,
  isBackgroundLoading,
  monthName,
  changeMonth,
}: {
  currentHijriInfo: any;
  isBackgroundLoading: boolean;
  monthName: string;
  changeMonth: (month: number) => void;
}) => {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-800 p-8 text-white shadow-xl">
      <div className="absolute -top-5 -right-5 opacity-10">
        <Moon size={160} strokeWidth={1} fill="currentColor" />
      </div>
      <div className="relative z-10 text-left">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-sm font-black tracking-[0.2em] uppercase opacity-60">
              Kalender Islam & Jawa
            </h3>
            <p className="text-3xl font-black tracking-tight">
              {currentHijriInfo
                ? `${currentHijriInfo.month.en} ${currentHijriInfo.year} H`
                : "Memuat..."}
            </p>
          </div>
          <div className="relative rounded-2xl border border-white/10 bg-white/10 p-3">
            <CalendarIcon size={24} className="text-emerald-300" />
            {isBackgroundLoading && (
              <div className="absolute -top-1 -right-1">
                <Loader2 size={12} className="animate-spin text-emerald-400" />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
            <span className="text-xs font-bold text-emerald-100">
              {monthName}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => changeMonth(-1)}
              className="rounded-xl bg-white/10 p-2 transition-colors hover:bg-white/20 active:scale-90"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="rounded-xl bg-white/10 p-2 transition-colors hover:bg-white/20 active:scale-90"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCalender;
