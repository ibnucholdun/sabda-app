import { Loader2 } from "lucide-react";
import React from "react";
import { toArabicDigits } from "~/utils/surahHelper";

const GridCalendar = ({
  isLoading,
  calendarDays,
}: {
  isLoading: boolean;
  calendarDays: any[];
}) => {
  return (
    <div className="relative rounded-[2.5rem] border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 grid grid-cols-7">
        {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day, idx) => (
          <div
            key={day}
            className={`text-center text-[10px] font-black tracking-widest uppercase ${idx === 0 ? "text-rose-500" : "text-slate-400"}`}
          >
            {day}
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <Loader2 size={32} className="animate-spin text-emerald-600" />
          <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Inisialisasi...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, idx) => {
            if (!day)
              return <div key={`empty-${idx}`} className="aspect-square"></div>;

            const isSunday = idx % 7 === 0;
            const hasIslamicEvent = day.islamicEvents.length > 0;
            const isRedDate = isSunday || day.isHoliday;

            return (
              <div
                key={idx}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-2xl border p-1 transition-all ${
                  day.isToday
                    ? "border-emerald-500 bg-emerald-600 shadow-lg shadow-emerald-200"
                    : day.isHoliday
                      ? "border-rose-100 bg-rose-50"
                      : hasIslamicEvent
                        ? "border-amber-100 bg-amber-50"
                        : "border-slate-100 bg-slate-50/30"
                }`}
              >
                <div className="mb-0.5 flex items-start gap-1">
                  <span
                    className={`mt-0.5 text-[9px] font-bold transition-opacity ${
                      !day.hijriDay ? "opacity-0" : "opacity-100"
                    } ${day.isToday ? "text-emerald-200" : "text-slate-400"}`}
                  >
                    {toArabicDigits(day.hijriDay)}
                  </span>

                  <span
                    className={`text-[14px] leading-none font-black ${
                      day.isToday
                        ? "text-white"
                        : isRedDate
                          ? "text-rose-600"
                          : "text-slate-800"
                    }`}
                  >
                    {day.gregorianDay}
                  </span>
                </div>

                <span
                  className={`text-[6px] leading-none font-black tracking-tighter uppercase ${
                    day.isToday ? "text-emerald-200/80" : "text-emerald-600/50"
                  }`}
                >
                  {day.pasaran}
                </span>

                {hasIslamicEvent && (
                  <div className="absolute top-1 right-1 h-1 w-1 rounded-full bg-amber-500"></div>
                )}
                {day.isHoliday && !day.isToday && (
                  <div className="absolute right-1 bottom-1 h-0.5 w-0.5 rounded-full bg-rose-400"></div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GridCalendar;
