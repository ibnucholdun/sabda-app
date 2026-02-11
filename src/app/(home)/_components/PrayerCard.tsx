"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { usePrayerTracker } from "../../../hooks/usePrayerTracker";
import { formatIndonesianDate } from "~/utils/dateHelper";

const PrayerCard: React.FC = () => {
  const { data, loading, currentTime, activePrayerInfo } = usePrayerTracker();

  if (loading || !data || !activePrayerInfo) {
    return (
      <div className="prayer-card-gradient relative flex min-h-53.5 items-center justify-center overflow-hidden rounded-[2.5rem] p-7 text-white">
        <div className="pointer-events-none absolute -right-5 -bottom-5 rotate-12 transform opacity-20">
          <svg
            width="240"
            height="240"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="10 10"
            />
            <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1" />
            <path d="M100 20V180M20 100H180" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="prayer-card-gradient animate-in zoom-in-95 relative flex min-h-50 flex-col justify-between overflow-hidden rounded-[2.5rem] p-7 text-white duration-500">
      <div className="pointer-events-none absolute -right-5 -bottom-5 rotate-12 transform opacity-20">
        <svg
          width="240"
          height="240"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1" />
          <path d="M100 20V180M20 100H180" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 text-left">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-sm font-black tracking-[0.2em] uppercase opacity-80">
              Menuju {activePrayerInfo.name}
            </h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-6xl font-bold tracking-tighter tabular-nums">
                {activePrayerInfo.time}
              </span>
              <span className="text-xl font-semibold text-emerald-200">
                WIB
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-right">
              <p className="text-2xl font-bold tracking-tighter text-white tabular-nums">
                {activePrayerInfo.countdown}
              </p>
              <p className="text-[10px] font-black tracking-widest text-emerald-300 uppercase opacity-80">
                Countdown
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-end justify-between border-t border-white/10 pt-4 text-left">
        <div className="space-y-0.5">
          <p className="text-xs font-bold tracking-wider text-emerald-100 opacity-90">
            {formatIndonesianDate(currentTime)}
          </p>
          <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-300 uppercase">
            {data.hijri.day} {data.hijri.month.en} {data.hijri.year} H
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/10 px-3 py-1 backdrop-blur-sm">
          <span className="text-[10px] font-black tracking-widest text-white/90 uppercase">
            Real-time Tracker
          </span>
        </div>
      </div>
    </div>
  );
};

export default PrayerCard;
