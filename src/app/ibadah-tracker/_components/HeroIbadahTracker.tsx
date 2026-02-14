import React from "react";
import type { Activity, HistoricalData } from "~/types/type";

const HeroIbadahTracker = ({
  dayName,
  dateNum,
  monthName,
  progress,
  completedCount,
  allActivities,
}: {
  dayName: string;
  dateNum: number;
  monthName: string;
  progress: number;
  completedCount: number;
  allActivities: Activity[];
}) => {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-800 p-8 text-white">
      <div className="relative z-10 text-left">
        <div className="mb-1 flex items-start justify-between">
          <h3 className="text-2xl font-black">Ibadah Tracker</h3>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-1.5">
            <span className="text-[9px] font-black tracking-tighter uppercase">
              {dayName}, {dateNum} {monthName}
            </span>
          </div>
        </div>
        <p className="mb-6 text-xs font-bold tracking-widest text-emerald-300 uppercase">
          Target Fleksibel Harian
        </p>
        <div className="mb-2 flex items-end justify-between">
          <span className="text-sm font-bold">
            {completedCount} / {allActivities.length} Amalan
          </span>
          <span className="text-sm font-black">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-emerald-400 transition-all duration-700"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HeroIbadahTracker;
