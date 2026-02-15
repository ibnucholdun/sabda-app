import { CheckCircle, Target } from "lucide-react";
import React from "react";

const ButtonTasbih = ({
  tasbihCount,
  tasbihLimit,
  progress,
  isFull,
  handleTasbihClick,
}: {
  tasbihCount: number;
  tasbihLimit: number;
  progress: number;
  isFull: boolean;
  handleTasbihClick: () => void;
}) => {
  const size = 240;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="group relative p-2">
      {/* Outer Glow Decoration */}
      <div
        className={`absolute inset-0 rounded-full blur-3xl transition-all duration-700 ${
          isFull
            ? "scale-105 animate-pulse bg-emerald-400/20"
            : "bg-emerald-500/5 group-active:bg-emerald-500/10"
        }`}
      ></div>

      <button
        onClick={handleTasbihClick}
        className="relative flex h-60 w-60 flex-col items-center justify-center overflow-hidden rounded-full bg-transparent shadow-[0_20px_50px_-12px_rgba(6,95,70,0.12)] transition-all active:scale-[0.96]"
      >
        {/* Background & Progress Ring (SVG) */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Main Background Circle */}
          <circle cx={center} cy={center} r={center} fill="white" />

          {/* Track Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Progress Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={isFull ? "#10b981" : "#059669"}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        {/* Ripple Layer */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="h-0 w-0 rounded-full bg-emerald-500/10 transition-all duration-500 ease-out group-active:h-full group-active:w-full"></div>
        </div>

        {/* Content Centered */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <h2
            className={`mb-1 text-[72px] leading-none font-black tracking-tighter tabular-nums transition-colors ${
              isFull ? "text-emerald-600" : "text-slate-900"
            }`}
          >
            {tasbihCount}
          </h2>

          <div className="mb-2 flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-3 py-1">
            <Target size={10} className="text-slate-400" />
            <span className="text-[10px] font-black tracking-wider text-slate-500 uppercase">
              {tasbihLimit} Target
            </span>
          </div>

          {isFull ? (
            <div className="flex animate-bounce items-center gap-1 text-emerald-600">
              <CheckCircle size={12} />
              <span className="text-[9px] font-black tracking-widest uppercase">
                Capai!
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-800">
              <div className="h-1 w-1 animate-pulse rounded-full bg-emerald-500"></div>
              <span className="text-[9px] font-black tracking-widest uppercase">
                Hitung
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default ButtonTasbih;
